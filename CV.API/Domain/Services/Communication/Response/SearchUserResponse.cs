using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class SearchUserResponse : BaseResponse<List<ConversationerResource>>
    {
        public SearchUserResponse(List<ConversationerResource> resource) : base(resource)
        { }
        public SearchUserResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}
