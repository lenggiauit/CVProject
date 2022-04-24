using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Domain.Services.Communication.Response;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CV.API.Services
{
    [Authorize]
    public class ConversationServiceHub : Hub
    {
        private readonly IChatService _chatServices;
        private readonly ILogger<ConversationServiceHub> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;

        public ConversationServiceHub(
            ILogger<ConversationServiceHub> logger,
            IMapper mapper,
            IChatService ChatServices,

            IOptions<AppSettings> appSettings) : base()
        {
            _chatServices = ChatServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        private readonly static ChatConnectionMapping<Guid> _chatConnections = new ChatConnectionMapping<Guid>();
        public Guid GetCurrentUserId()
        {
            var claimUser = Context.User.Claims.Where(c => c.Type == ClaimTypes.UserData).FirstOrDefault();
            if (claimUser != null)
            {
                User userResource = JsonConvert.DeserializeObject<User>(claimUser.Value);
                return userResource.Id;
            }
            else
            {
                return Guid.Empty;
            }
        }

        public async Task CheckConnectionStatus(Guid userId)
        {
            await Clients.Group(userId.ToString().Trim()).SendAsync("onCheckConnectionStatus", "[Connected]");
        }

        public async Task InitConversations(Guid[] conversationIds)
        {
            foreach (var id in conversationIds)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, id.ToString().Trim());
            } 
        }

        public async Task StartConversation(Guid conversationId, string jsonConversation)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString().Trim());
            try
            {
                var convResource = JsonConvert.DeserializeObject<ConversationResource>(jsonConversation);
                if (convResource != null)
                {
                    foreach (var user in convResource.Conversationers)
                    {
                        if (user.Id != GetCurrentUserId())
                        {
                            await Clients.Group(user.Id.ToString().Trim()).SendAsync("onStartConversation", jsonConversation);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task SendMessage(string jsonConversation)
        {
            try
            {
                var convMessageResource = JsonConvert.DeserializeObject<ConversationMessageResource>(jsonConversation);
                if (convMessageResource != null)
                {
                    await Clients.Group(convMessageResource.ConversationId.ToString().Trim()).SendAsync("onReceivedMessage", jsonConversation);
                    await Clients.Group(convMessageResource.ConversationId.ToString().Trim()).SendAsync("onConversationReceivedMessage", jsonConversation);
                    await _chatServices.SaveMessage(GetCurrentUserId(), convMessageResource.ConversationId, convMessageResource.Message);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeleteMessage(Guid conversationId, Guid messageId)
        {
            try
            {
                await Clients.Group(conversationId.ToString().Trim()).SendAsync("onDeleteMessage", conversationId, messageId);
                await _chatServices.DeleteMessage(GetCurrentUserId(), conversationId, messageId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }



        public async Task InviteToConversation(Guid conversationId, Guid[] users)
        { 
            var resultCode = await _chatServices.InviteToConversation(new BaseRequest<InviteConversationRequest>()
            {
                Payload = new InviteConversationRequest() { ConversationId = conversationId, Users = users }
            });

            var conv = await _chatServices.GetConversationById(conversationId);
            if (conv != null)
            {
                try
                {
                    var resources = _mapper.Map<Conversation, ConversationResource>(conv);
                    var convStr = JsonConvert.SerializeObject(resources);
                    foreach (var u in users)
                    {
                        if (u != GetCurrentUserId())
                        {
                            await Clients.Group(u.ToString().Trim()).SendAsync("onInviteToConversation", convStr);
                        }
                    }
                }
                catch(Exception e)
                {
                    _logger.LogError(e.Message);
                }
            }
        }


        public async Task RemoveFromConversation(Guid conversationId, Guid[] users)
        {

            var resultCode = await _chatServices.RemoveFromConversation(GetCurrentUserId(), new BaseRequest<RemoveFromConversationRequest>()
            {
                Payload = new RemoveFromConversationRequest() { ConversationId = conversationId, Users = users }
            });

            foreach (var u in users)
            {
                await Clients.Group(conversationId.ToString().Trim()).SendAsync("onRemoveFromConversation", conversationId.ToString().Trim(), u.ToString().Trim());
            }
        }


        public async Task OnTyping(Guid conversationId, Guid userId)
        {
            await Clients.Group(conversationId.ToString().Trim()).SendAsync("onUserTyping", conversationId.ToString().Trim(), userId.ToString().Trim());
            await Clients.Group(conversationId.ToString().Trim()).SendAsync("onConversationTyping", conversationId.ToString().Trim(), userId.ToString().Trim());
        }
        public async Task OnInviting(Guid conversationId, Guid userId)
        {
            await Clients.Group(conversationId.ToString().Trim()).SendAsync("onInviting", userId.ToString().Trim());
        }
        public async Task AddToConversationGroup(Guid conversationId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString().Trim());
        }
        public async Task RemoveFromConversationGroup(Guid conversationId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId.ToString().Trim());
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, GetCurrentUserId().ToString().Trim());
            //_chatConnections.Add(GetCurrentUserId(), Context.ConnectionId); 
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Groups.RemoveFromGroupAsync(Context.ConnectionId, GetCurrentUserId().ToString().Trim());
            //_chatConnections.Remove(GetCurrentUserId(), Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

    }
}
