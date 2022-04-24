using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class RegisterResponse : BaseResponse<RegisterResource>
    {
        public RegisterResponse(RegisterResource resource) : base(resource)
        { }
        public RegisterResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
        public RegisterResponse(bool success) : base(success)
        { }
    } 
}
