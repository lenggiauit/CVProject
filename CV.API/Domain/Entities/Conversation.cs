using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class Conversation : BaseEntity
    { 
        public string Title { get; set; }
        public string LastMessage { get; set; }
        public DateTime? LastMessageDate { get; set; } 
        public virtual List<User> Conversationers { get; set; }
    }
}
