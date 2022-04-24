using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class TodoType : BaseEntity
    { 
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public int? Order { get; set; }
        public bool? IsActive { get; set; } 
        public virtual List<Todo> Todo { get; set; }
    }
}
