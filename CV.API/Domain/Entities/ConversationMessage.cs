using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class ConversationMessage : BaseEntity
    { 
        public Guid ConversationId { get; set; }
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public string LovedByUids { get; set; }
        public string SeenByUids { get; set; }
        public DateTime? SendDate { get; set; }
    }
}
