using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class TemplateType: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsArchived { get; set; }
        [NotMapped]
        public int TotalRows { get; set; }
    }
}
