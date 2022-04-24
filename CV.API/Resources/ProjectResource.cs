using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class ProjectResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public bool IsArchived { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }  
        public ProjectStatusResource Status { get; set; } 
        public int TotalRows { get; set; }
    }
}
