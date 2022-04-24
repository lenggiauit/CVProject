using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class GetMessagesResponse : BaseResponse<List<ConversationMessageResource>>
    {
        public GetMessagesResponse(List<ConversationMessageResource> resource) : base(resource)
        { }
        public GetMessagesResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}
