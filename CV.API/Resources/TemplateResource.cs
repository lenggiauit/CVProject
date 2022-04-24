using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class TemplateResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public TemplateTypeResource TemplateType { get; set; }
        public List<ControlResource> Controls { get; set; }
        public bool IsArchived { get; set; }
        public List<CSSContentResource> CSSContents { get; set; }
        public List<LanguageResource> Languages { get; set; } 
    }
}
