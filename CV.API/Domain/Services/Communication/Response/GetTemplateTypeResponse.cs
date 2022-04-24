using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class GetTemplateTypeResponse : BaseResponse<List<TemplateTypeResource>>
    {
        public GetTemplateTypeResponse(List<TemplateTypeResource> resource) : base(resource)
        { }
        public GetTemplateTypeResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
}
