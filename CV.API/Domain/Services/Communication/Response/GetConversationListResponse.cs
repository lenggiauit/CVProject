using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class GetConversationListResponse : BaseResponse<List<ConversationResource>>
    {
        public GetConversationListResponse(List<ConversationResource> resource) : base(resource)
        { }
        public GetConversationListResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}
