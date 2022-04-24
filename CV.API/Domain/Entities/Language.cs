using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class Language :  BaseEntity
    {
        public Guid TemplateId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
    }
}
