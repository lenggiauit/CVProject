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
using CV.API.Infrastructure;
using CV.API.Resources;
using CV.API.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Controllers
{
    [Authorize]
    [Route("Chat")]
    public class ChatController : PMBaseController
    {
        private readonly IChatService _chatServices;
        private readonly ILogger<ChatController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        private readonly IHubContext<ConversationServiceHub> _chatServiceHub;

        public ChatController(
            ILogger<ChatController> logger,
            IMapper mapper,
            IChatService ChatServices,
           [NotNull]IHubContext<ConversationServiceHub> chatServiceHub,
            IOptions<AppSettings> appSettings) : base()
        {
            _chatServices = ChatServices;
            _chatServiceHub = chatServiceHub;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // [Permissions("CreateConversation")]
        [HttpPost("CreateConversation")]
        public async Task<CreateConversationResponse> CreateConversation([FromBody] BaseRequest<CreateConversationRequest> request)
        {
            if (ModelState.IsValid)
            {
                var conversation = await _chatServices.CreateConversation(GetCurrentUserId(), request);
                if (conversation != null)
                {
                    var resources = _mapper.Map<Conversation, ConversationResource>(conversation);
                    return new CreateConversationResponse(resources);
                }
                else
                {
                    return new CreateConversationResponse(Constants.UnknowMsg, ResultCode.Unknown);
                }

            }
            else
            {
                return new CreateConversationResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }

        }

        // [Permissions("DeleteConversation")]
        [HttpPost("DeleteConversation")]
        public async Task<CommonResponse> DeleteConversation([FromBody] BaseRequest<Guid> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _chatServices.DeleteConversation(GetCurrentUserId(), request);                 
                return new CommonResponse(result);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        // [Permissions("SendMessage")]
        [HttpPost("SendMessage")]
        public async Task<CommonResponse> SendMessage([FromBody] BaseRequest<SendMessageRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _chatServices.SendMessage(GetCurrentUserId(), request);
                if (result != null)
                {
                    await _chatServiceHub.Clients.Group(request.Payload.ConversationId.ToString()).SendAsync("SendToConversation", JsonConvert.SerializeObject(result));
                    return new CommonResponse(ResultCode.Success);
                }
                else
                {
                    return new CommonResponse(Constants.UnknowMsg, ResultCode.Unknown);
                }
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }




       // [Permissions("InviteToConversation")]
        [HttpPost("InviteToConversation")]
        public async Task<CommonResponse> InviteToConversation([FromBody] BaseRequest<InviteConversationRequest> request)
        {
            if (ModelState.IsValid)
            {
                var resultCode = await _chatServices.InviteToConversation(request); 
                return new CommonResponse(resultCode);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        // [Permissions("RemoveFromConversation")]
        [HttpPost("RemoveFromConversation")]
        public async Task<CommonResponse> RemoveFromConversation([FromBody] BaseRequest<RemoveFromConversationRequest> request)
        {
            if (ModelState.IsValid)
            {
                var resultCode = await _chatServices.RemoveFromConversation(GetCurrentUserId(), request);
                return new CommonResponse(resultCode);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        //[Permissions("GetConversationListByUser")]
        [HttpPost("GetConversationListByUser")]
        public async Task<GetConversationListResponse> GetConversationListByUser([FromBody] BaseRequest<GetConversationListRequest> request)
        {
            if (ModelState.IsValid)
            {
                var chatList = await _chatServices.GetConversationListByUser(GetCurrentUserId(), request);
                var resources = _mapper.Map<List<Conversation>, List<ConversationResource>>(chatList);
                return new GetConversationListResponse(resources);
            }
            else
            {
                return new GetConversationListResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetMessagesByConversation")]
        public async Task<GetMessagesResponse> GetMessagesByConversation([FromBody] BaseRequest<GetMessagesRequest> request)
        {
            if (ModelState.IsValid)
            {
                var chatList = await _chatServices.GetMessagesByConversation(GetCurrentUserId(), request);
                var resources = _mapper.Map<List<ConversationMessage>, List<ConversationMessageResource>>(chatList.OrderBy(c => c.SendDate).ToList());
                return new GetMessagesResponse(resources);
            }
            else
            {
                return new GetMessagesResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        //[Permissions("SearchConversationer")]
        [HttpPost("ConversationalSearch")]
        public async Task<GetConversationListResponse> ConversationalSearch([FromBody] BaseRequest<ConversationalSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var searchResult  = await _chatServices.ConversationalSearch(GetCurrentUser(), request);
                var resources = _mapper.Map<List<Conversation>, List<ConversationResource>>(searchResult);
                return new GetConversationListResponse(resources);
            }
            else
            {
                return new GetConversationListResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        //[Permissions("SearchConversationer")]
        [HttpPost("MessengerSearch")]
        public async Task<MessengerListResponse> MessengerSearch([FromBody] BaseRequest<MessengerSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var searchResult = await _chatServices.MessengerSearch(GetCurrentUser(), request);
                var resources = _mapper.Map<List<User>, List<ConversationerResource>>(searchResult);
                return new MessengerListResponse(resources);
            }
            else
            {
                return new MessengerListResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        



    }
}


