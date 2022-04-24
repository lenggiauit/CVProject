using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class TeamResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsPublic { get; set; }
        public bool? IsActive { get; set; }
        public Guid? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
