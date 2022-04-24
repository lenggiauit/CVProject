using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class Template : BaseEntity
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Version { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Package { get; set; }
        public Guid TemplateTypeId { get; set; } 
        public bool IsArchived { get; set; } 
        public virtual TemplateType TemplateType { get; set; }
        public virtual List<CSSContent> CSSContents { get; set; }
        public virtual List<Language> Languages { get; set; }
        public virtual List<Control> Controls { get; set; }
        [NotMapped]
        public int TotalRows { get; set; }
    }
}
