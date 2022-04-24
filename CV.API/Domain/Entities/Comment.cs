using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class Comment : BaseEntity
    { 
        public Guid ParentId { get; set; }
        public string CommentContent { get; set; } 
        public bool? IsDeleted { get; set; }
    }
}
