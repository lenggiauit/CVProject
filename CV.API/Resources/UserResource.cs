using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class UserResource
    { 
        public Guid Id { get; set; }
        public string Name { get; set; }
        public RoleResource Role { get; set; }
        public string AccessToken { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Phone { get; set; }
        public string JobTitle { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public List<PermissionResource> Permissions { get; set; }
        public List<TeamResource> Teams { get; set; }


    }
}
