using CV.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public abstract class BaseResponse<T>
    { 
        public ResultCode ResultCode { get; private set; }
        public string? Messages { get; private set; }
        public T Resource { get; private set; } 
       
        protected BaseResponse(T resource)
        { 
            Messages = string.Empty;
            Resource = resource;
            ResultCode = ResultCode.Success;
        }
        protected BaseResponse(T resource, ResultCode resultCode)
        {
            Messages = string.Empty;
            Resource = resource;
            ResultCode = resultCode;
        }
        protected BaseResponse(string message, ResultCode resultCode = ResultCode.Unknown)
        { 
            Messages = message;
            Resource = default;
            ResultCode = resultCode;
        }
        protected BaseResponse(bool success)
        { 
            Messages = string.Empty;
            Resource = default;
            ResultCode = success ? ResultCode.Success : ResultCode.Error;
        }
        protected BaseResponse(ResultCode resultCode)
        {
            Messages = string.Empty;
            Resource = default;
            ResultCode = resultCode;
        }
    }
}
