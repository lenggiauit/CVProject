using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class ConversationalSearchRequest
    {
        [Required]
        public string Keyword { get; set; }
    }
}
