using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class UserOnProject : BaseEntity
    { 
        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        [ForeignKey("ProjectId")]
        public Guid ProjectId { get; set; }
        [ForeignKey("RoleId")]
        public Guid RoleId { get; set; }

        public virtual Project Project { get; set; }
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
