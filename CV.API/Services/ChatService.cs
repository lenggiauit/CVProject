using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<ChatService> _logger;

        public ChatService(IChatRepository chatRepository, ILogger<ChatService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _chatRepository = chatRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<List<Conversation>> ConversationalSearch(User currentUser, BaseRequest<ConversationalSearchRequest> request)
        {
            return await _chatRepository.ConversationalSearch(currentUser, request);

        }

        public async Task<Conversation> CreateConversation(Guid userId, BaseRequest<CreateConversationRequest> request)
        {
            return await _chatRepository.CreateConversation(userId, request); 
        }

        public async Task<ResultCode> DeleteConversation(Guid userId, BaseRequest<Guid> request)
        {
            return await _chatRepository.DeleteConversation(userId, request);
        }

        public async Task DeleteMessage(Guid userId, Guid conversationId, Guid messageId)
        {
            await _chatRepository.DeleteMessage(userId, conversationId, messageId);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<Conversation> GetConversationById(Guid conversationId)
        {
            return await _chatRepository.GetConversationById(conversationId);
        }

        public async Task<List<Conversation>> GetConversationListByUser(Guid userId, BaseRequest<GetConversationListRequest> request)
        {
            return await _chatRepository.GetConversationListByUser(userId, request);
        }

        public async Task<List<ConversationMessage>> GetMessagesByConversation(Guid userId, BaseRequest<GetMessagesRequest> request)
        {
            return await _chatRepository.GetMessagesByConversation(userId, request);
        }

        public async Task<ResultCode> InviteToConversation(BaseRequest<InviteConversationRequest> request)
        {
            return await _chatRepository.InviteToConversation(request);
        }

        public async Task<List<User>> MessengerSearch(User user, BaseRequest<MessengerSearchRequest> request)
        {
            return await _chatRepository.MessengerSearch(user, request);
        }

        public async Task<ResultCode> RemoveFromConversation(Guid userId, BaseRequest<RemoveFromConversationRequest> request)
        {
            return await _chatRepository.RemoveFromConversation(userId, request);
        }

        public async Task SaveMessage(Guid userId, Guid conversationId, string message)
        {
            await _chatRepository.SaveMessage(userId, conversationId, message);
            await _unitOfWork.CompleteAsync();
        } 
          

        public async Task<ConversationMessage> SendMessage(Guid userId, BaseRequest<SendMessageRequest> request)
        {
            return await _chatRepository.SendMessage(userId, request);
        }
    }
}
