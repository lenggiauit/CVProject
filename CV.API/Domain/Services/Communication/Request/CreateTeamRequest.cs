using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class CreateTeamRequest
    {
        [Required]
        public string Name { get; set; }
        [Required] 
        public string Description { get; set; }
        public bool? IsPublic { get; set; }
    }
}
