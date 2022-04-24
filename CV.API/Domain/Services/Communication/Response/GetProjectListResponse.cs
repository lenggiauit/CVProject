using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class GetProjectListResponse : BaseResponse<List<ProjectResource>>
    {
        public GetProjectListResponse(List<ProjectResource> resource) : base(resource)
        { }
        public GetProjectListResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}
