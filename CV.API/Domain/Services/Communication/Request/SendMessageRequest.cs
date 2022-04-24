using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class SendMessageRequest
    {
        [Required]
        public Guid ConversationId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Message { get; set; } 
    }
}
