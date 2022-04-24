using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class UserOnTeam : BaseEntity
    { 
        public Guid? UserId { get; set; }
        public Guid? TeamId { get; set; }

        public virtual Team Team { get; set; }
        public virtual User User { get; set; }
    }
}
