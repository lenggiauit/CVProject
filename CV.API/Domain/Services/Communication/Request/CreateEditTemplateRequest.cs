using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class CreateEditTemplateRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public Guid TemplateTypeId { get; set; }
        public string Package { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; } 
    }
}
