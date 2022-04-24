using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class GetTemplatesRequest
    {
        public bool IsArchived { get; set; }
    }

    public class GetTemplatesByFilterRequest
    {
        public Guid? TypeId { get; set; }
    }
     
}
