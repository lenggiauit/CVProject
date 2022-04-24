using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class Role : BaseEntity
    { 
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; } 
        public bool? IsSystemRole { get; set; } 
        public virtual List<PermissionInRole> PermissionInRole { get; set; }
        public virtual List<User> User { get; set; }
        public virtual List<UserOnProject> UserOnProject { get; set; }
    }
}
