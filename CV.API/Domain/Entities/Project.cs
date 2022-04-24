using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class Project : BaseEntity
    { 

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsArchived { get; set; }
        
        public Guid StatusId { get; set; } 
        public ProjectStatus Status { get; set; }
        public  List<Todo> Todo { get; set; }
        public  List<User> Members { get; set; } 
        [NotMapped]
        public int TotalRows { get; set; }
    }
}
