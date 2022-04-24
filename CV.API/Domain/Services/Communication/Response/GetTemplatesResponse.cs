using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{ 
    public class GetTemplatesResponse : BaseResponse<List<TemplateResource>>
    {
        public GetTemplatesResponse(List<TemplateResource> resource) : base(resource)
        { }
        public GetTemplatesResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }
     

    public class GetTemplateResponse : BaseResponse<TemplateResource>
    {
        public GetTemplateResponse(TemplateResource resource) : base(resource)
        { }
        public GetTemplateResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
    }

}
