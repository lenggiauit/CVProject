using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class GetTeamListResponse : BaseResponse<List<TeamResource>>
    {
        public GetTeamListResponse(List<TeamResource> resource) : base(resource)
        { }
        public GetTeamListResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { } 
    }
}
