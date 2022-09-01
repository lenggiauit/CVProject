using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Nancy.Extensions;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public class ChatRepository : BaseRepository, IChatRepository
    {
        private readonly ILogger<ChatRepository> _logger;
        public ChatRepository(PMContext context, ILogger<ChatRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<Conversation> CreateConversation(Guid userId, BaseRequest<CreateConversationRequest> request)
        {
            try
            {
                var existCons = await _context.Conversation.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                if (existCons == null)
                {
                    var conversation = new Conversation()
                    {
                        Id = Guid.NewGuid(),
                        Title = request.Payload.Title,
                        CreatedBy = userId,
                        CreatedDate = DateTime.Now
                    };
                    await _context.Conversation.AddAsync(conversation);
                    List<ConversationUsers> listc = new List<ConversationUsers>();

                    foreach (var id in request.Payload.Users)
                    {
                        listc.Add(new ConversationUsers()
                        {
                            Id = Guid.NewGuid(),
                            ConversationId = conversation.Id,
                            UserId = id
                        });
                    }
                    await _context.ConversationUsers.AddRangeAsync(listc);
                    await _context.SaveChangesAsync();
                    conversation.Conversationers = _context.ConversationUsers.Where(cus2 => cus2.ConversationId.Equals(conversation.Id))
                        .Join(_context.User, cus2 => cus2.UserId, u => u.Id, (cus2, u) => new User()
                        {
                            Id = u.Id,
                            UserName = u.UserName,
                            Email = u.Email,
                            Avatar = u.Avatar,
                            FullName = u.FullName,
                            Phone = u.Phone,
                            Address = u.Address,
                            JobTitle = u.JobTitle,
                            Role = _context.Role.Where(r => r.Id == u.RoleId).FirstOrDefault()
                        })
                        .ToList();
                    return conversation;
                }
                else
                {
                    return existCons;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<ResultCode> DeleteConversation(Guid userId, BaseRequest<Guid> request)
        {
            try
            {
                _context.ConversationMessage.RemoveRange(_context.ConversationMessage.Where(cm => cm.ConversationId.Equals(request.Payload)).ToArray());
                _context.ConversationUsers.RemoveRange(_context.ConversationUsers.Where(cm => cm.ConversationId.Equals(request.Payload)).ToArray());
                _context.Conversation.Remove(new Conversation() { Id = request.Payload });
                await _context.SaveChangesAsync();
                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> InviteToConversation(BaseRequest<InviteConversationRequest> request)
        {
            try
            {
                List<ConversationUsers> listc = new List<ConversationUsers>();

                foreach (var id in request.Payload.Users)
                {
                    listc.Add(new ConversationUsers()
                    {
                        Id = Guid.NewGuid(),
                        ConversationId = request.Payload.ConversationId,
                        UserId = id
                    });
                }
                await _context.ConversationUsers.AddRangeAsync(listc);
                await _context.SaveChangesAsync();
                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<List<Conversation>> GetConversationListByUser(Guid userId, BaseRequest<GetConversationListRequest> request)
        {
            try
            {
                return await _context.Conversation.OrderByDescending(s => s.LastMessageDate).Join(_context.ConversationUsers.Where(cu => cu.UserId.Equals(userId)),
                    c => c.Id,
                    cus => cus.ConversationId,
                    (c, cus) => new Conversation()
                    {
                        Id = c.Id,
                        Title = c.Title,
                        LastMessage = c.LastMessage,
                        CreatedBy = c.CreatedBy,
                        CreatedDate = c.CreatedDate,
                        UpdatedBy = c.UpdatedBy,
                        LastMessageDate = c.LastMessageDate,
                        Conversationers = _context.ConversationUsers.Where(cus2 => cus2.ConversationId.Equals(c.Id))
                        .Join(_context.User, cus2 => cus2.UserId, u => u.Id, (cus2, u) => new User()
                        {
                            Id = u.Id,
                            UserName = u.UserName,
                            Email = u.Email,
                            Avatar = u.Avatar,
                            FullName = u.FullName,
                            Phone = u.Phone,
                            Address = u.Address,
                            JobTitle = u.JobTitle,
                            Role = _context.Role.Where(r => r.Id == u.RoleId).FirstOrDefault()
                        })
                        .ToList()
                    })
                    .AsNoTracking().GetPagingQueryable(request.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
        public async Task<ConversationMessage> SendMessage(Guid userId, BaseRequest<SendMessageRequest> request)
        {
            try
            {
                var message = new ConversationMessage()
                {
                    Id = Guid.NewGuid(),
                    ConversationId = request.Payload.ConversationId,
                    UserId = userId,
                    SendDate = DateTime.Now,
                    Message = request.Payload.Message
                };
                await _context.ConversationMessage.AddAsync(message);
                await _context.SaveChangesAsync();
                return message;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task SaveMessage(Guid userId, Guid conversationId, Guid msId, string message)
        {
            try
            { 
                var convMessage = new ConversationMessage()
                {
                    Id = msId,
                    ConversationId = conversationId,
                    UserId = userId,
                    SendDate = DateTime.Now,
                    Message = message
                };
                await _context.ConversationMessage.AddAsync(convMessage);

                var conversation = _context.Conversation.Where(c => c.Id.Equals(conversationId)).FirstOrDefault();
                if (conversation != null)
                {
                    conversation.LastMessage = message;
                    conversation.LastMessageDate = DateTime.Now;
                }
                _context.Update(conversation); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message); 
            }
        }

        public async Task<List<ConversationMessage>> GetMessagesByConversation(object userId, BaseRequest<GetMessagesRequest> request)
        {
            try
            {
                return await _context.ConversationMessage.OrderByDescending(s => s.SendDate).Where(cm => cm.ConversationId.Equals(request.Payload.ConversationId))
                    .AsNoTracking().GetPagingQueryable(request.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Conversation>> ConversationalSearch(User currentUser, BaseRequest<ConversationalSearchRequest> request)
        {
            try
            {
                //return await _context.User.AsNoTracking()
                //    .Where(u => (u.UserName.ToLower().Contains(request.Payload.Keyword.ToLower())
                //    || u.FullName.ToLower().Contains(request.Payload.Keyword.ToLower())) 
                //     && u.Id != currentUser.Id)
                //    .Select( u => new User()
                //        {
                //            Id = u.Id,
                //            UserName = u.UserName,
                //            Email = u.Email, 
                //            FullName = u.FullName, 
                //        }) 
                //    .Select(u => new Conversation()
                //    {
                //        Id = Guid.NewGuid(),
                //        Title = !string.IsNullOrEmpty(u.FullName) ? u.FullName : u.UserName,
                //        LastMessage = string.Empty,
                //        CreatedDate = DateTime.Now,
                //        Conversationers = new List<User> { currentUser, u },
                //    })
                //    .ToListAsync();


                return _context.Conversation.AsNoTracking()
                    .OrderByDescending(s => s.UpdatedBy)
                    .Where(c => c.Title.ToLower().Contains(request.Payload.Keyword.ToLower()))
                    .Join(_context.ConversationUsers,
                    c => c.Id,
                    cus => cus.ConversationId,
                    (c, cus) => new Conversation()
                    {
                        Id = c.Id,
                        Title = c.Title,
                        LastMessage = c.LastMessage,
                        CreatedBy = c.CreatedBy,
                        CreatedDate = c.CreatedDate,
                        UpdatedBy = c.UpdatedBy,
                        LastMessageDate = c.LastMessageDate,
                        Conversationers = _context.ConversationUsers.Where(cus2 => cus2.ConversationId.Equals(c.Id))
                        .Join(_context.User, cus2 => cus2.UserId, u => u.Id, (cus2, u) => new User()
                        {
                            Id = u.Id,
                            UserName = u.UserName,
                            Email = u.Email,
                            Avatar = u.Avatar,
                            FullName = u.FullName,
                            Phone = u.Phone,
                            Address = u.Address,
                            JobTitle = u.JobTitle,
                            Role = _context.Role.Where(r => r.Id == u.RoleId).FirstOrDefault()
                        })
                        .ToList()
                    })
                    .AsEnumerable()
                    .Union(_context.User.AsNoTracking().Where(u => (u.UserName.Contains(request.Payload.Keyword) || u.FullName.Contains(request.Payload.Keyword)) && u.Id != currentUser.Id)
                        .Select(u => new User()
                        {
                            Id = u.Id,
                            UserName = u.UserName,
                            Email = u.Email,
                            FullName = u.FullName,
                        })
                    .Select(u => new Conversation()
                    {
                        Id = Guid.NewGuid(),
                        Title = !string.IsNullOrEmpty(u.FullName) ? u.FullName : u.UserName,
                        LastMessage = string.Empty,
                        CreatedDate = DateTime.Now,
                        Conversationers = new List<User> { currentUser, u },
                    }))
                    //.DistinctBy(d => d.Conversationers )
                    .ToList();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<User>> MessengerSearch(User currentUser, BaseRequest<MessengerSearchRequest> request)
        {
            return await _context.User.AsNoTracking()
                .Where(u => (u.UserName.Contains(request.Payload.Keyword) || u.FullName.Contains(request.Payload.Keyword))
                && u.Id != currentUser.Id
                && (!request.Payload.CurrentIds.Contains(u.Id)))
                       .Select(u => new User()
                       {
                           Id = u.Id,
                           UserName = u.UserName,
                           FullName = u.FullName,
                           JobTitle = u.JobTitle,
                           Avatar = u.Avatar
                       })
                   .ToListAsync();
        }

        public async Task<ResultCode> RemoveFromConversation(Guid userId, BaseRequest<RemoveFromConversationRequest> request)
        {
            try
            {
                List<ConversationUsers> listc = _context.ConversationUsers
                    .Where(cu =>
                    cu.ConversationId.Equals(request.Payload.ConversationId)
                    && request.Payload.Users.Contains(cu.UserId)
                    && cu.UserId != userId
                    ).ToList();

                _context.ConversationUsers.RemoveRange(listc);
                await _context.SaveChangesAsync();
                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task DeleteMessage(Guid userId, Guid conversationId, Guid messageId)
        {
            try
            {
                var ms = await _context.ConversationMessage.Where(m => m.ConversationId.Equals(conversationId) && m.Id.Equals(messageId) && m.UserId.Equals(userId)).FirstOrDefaultAsync();
                if (ms != null)
                {
                    _context.ConversationMessage.Remove(ms);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task<Conversation> GetConversationById(Guid conversationId)
        {
            return await _context.Conversation.Where(c => c.Id.Equals(conversationId))
                    .Select(c => new Conversation()
                    {
                        Id = c.Id,
                        Title = c.Title,
                        LastMessage = c.LastMessage,
                        CreatedBy = c.CreatedBy,
                        CreatedDate = c.CreatedDate,
                        UpdatedBy = c.UpdatedBy,
                        LastMessageDate = c.LastMessageDate,
                        Conversationers = _context.ConversationUsers.Where(cu => cu.ConversationId.Equals(c.Id))
                          .Join(_context.User, cus2 => cus2.UserId, u => u.Id, (cus2, u) => new User()
                          {
                              Id = u.Id,
                              UserName = u.UserName,
                              Email = u.Email,
                              Avatar = u.Avatar,
                              FullName = u.FullName,
                              Phone = u.Phone,
                              Address = u.Address,
                              JobTitle = u.JobTitle,
                              Role = _context.Role.Where(r => r.Id == u.RoleId).FirstOrDefault()
                          })
                          .Distinct()
                          .ToList()
                    })
                   .AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<int> CheckNewMessagesByUser(Guid userId)
        { 
            return await _context.ConversationUsers.Where(cu => cu.UserId.Equals(userId))
                .Join(_context.ConversationMessage.
                Where(cm => (cm.SeenByUids == null || !cm.SeenByUids.Contains (userId.ToString())) && !cm.UserId.Equals(userId)),
                cu1 => cu1.ConversationId, cm1 => cm1.ConversationId, (cu2, cm2) => cm2) 
                .AsNoTracking().CountAsync();
        }

        public async Task SetUserSeenMessages(List<Guid> userIds, Guid conversationId)
        {
            var ms = _context.ConversationMessage.Where(c => c.Id.Equals(conversationId)).FirstOrDefault();

            if(ms != null)
            {
                ms.SeenByUids = String.Format("{0},{1}", ms.SeenByUids, string.Join(",", userIds)); 
                _context.ConversationMessage.Update(ms);
                await _context.SaveChangesAsync();
            }
           
        }
    }
}
