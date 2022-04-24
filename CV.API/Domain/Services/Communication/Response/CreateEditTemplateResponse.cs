using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class CreateEditTemplateResponse : BaseResponse<TemplateResource>
    {
        public CreateEditTemplateResponse(TemplateResource resource) : base(resource)
        { }
        public CreateEditTemplateResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
        public CreateEditTemplateResponse(bool success) : base(success)
        { }
    }
}