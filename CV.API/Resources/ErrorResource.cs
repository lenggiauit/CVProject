using CV.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{ 
    public class ErrorResource
    {
        public ResultCode ResultCode = ResultCode.Unknown;
        public List<string> Messages { get; private set; }

        public ErrorResource(List<string> messages, ResultCode errorCode = ResultCode.Unknown)
        {
            this.Messages = messages ?? new List<string>();
        }

        public ErrorResource(string message, ResultCode errorCode = ResultCode.Unknown)
        {
            this.Messages = new List<string>();

            if (!string.IsNullOrWhiteSpace(message))
            {
                this.Messages.Add(message);
            }
        }
    }
}
