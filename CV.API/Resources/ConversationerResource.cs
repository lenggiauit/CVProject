using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class ConversationerResource
    {
        public Guid Id { get; set; } 
        public RoleResource Role { get; set; } 
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Phone { get; set; }
        public string JobTitle { get; set; } 
       
    }
}
