using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class LicensesCertifications : BaseEntity
    {
        public string Name { get; set; } 
        public string IssuingOrganization { get; set; }
        public string Link { get; set; }
    }
}
