using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class AuthenticateRequest
    {
        [Required]
        public string Name { get; set; } 
        [Required]
        public string Password { get; set; }
    }
}
