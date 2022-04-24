using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class UserEducation : BaseEntity
    {
        public string Name { get; set; }
        public string ShoolName { get; set; }
        public string Description { get; set; }
    }
}
