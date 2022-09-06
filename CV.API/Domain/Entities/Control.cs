using CV.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class Control : BaseEntity
    {
        public Guid TemplateId { get; set; }
        public string Name { get; set; }
        public Guid ParentId { get; set; } 
        public ControlType Type {get;set;}
        public int Order { get; set; }
        public ControlType EditType { get; set; }
        public string Text { get; set; }
        public string Placeholder { get; set; }
        public string Value { get; set; }
        public string CssClass { get; set; }
        public List<Control> Childs { get; set; }
        public string? AutoFill { get; set; }
    }
}
