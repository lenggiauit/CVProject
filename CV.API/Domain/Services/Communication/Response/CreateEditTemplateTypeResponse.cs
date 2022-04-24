using CV.API.Domain.Helpers;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Response
{
    public class CreateEditTemplateTypeResponse : BaseResponse<TemplateTypeResource>
    {
        public CreateEditTemplateTypeResponse(TemplateTypeResource resource) : base(resource)
        { }
        public CreateEditTemplateTypeResponse(string message, ResultCode resultCode) : base(message, resultCode)
        { }
        public CreateEditTemplateTypeResponse(bool success) : base(success)
        { }
    }
}