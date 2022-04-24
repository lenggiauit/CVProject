using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class AuthenticateResponse : BaseResponse<UserResource>
    {
        public AuthenticateResponse(UserResource resource) : base(resource)
        { }
        public AuthenticateResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
        public AuthenticateResponse(bool success) : base(success)
        { }
    }
}