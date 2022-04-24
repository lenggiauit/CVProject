using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class CreateProjectResponse : BaseResponse<ProjectResource>
    {
        public CreateProjectResponse(ProjectResource resource, ResultCode resultCode) : base(resource, resultCode)
        { }
        public CreateProjectResponse(string message) : base(message)
        { }
        public CreateProjectResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}