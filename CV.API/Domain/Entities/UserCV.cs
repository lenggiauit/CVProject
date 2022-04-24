using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class UserCV : BaseEntity
    {
        public string Name { get; set; }
        public string About { get; set; }
        public List<WorkingExperience> Experiences { get; set; }
        public List<UserProject> Projects { get; set; }
        public List<LicensesCertifications> LicensesCertifications { get; set; }
        public List<UserEducation> Educations { get; set; }
    }
}
