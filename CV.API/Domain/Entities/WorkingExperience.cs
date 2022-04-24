using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Entities
{
    public class WorkingExperience : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CompanyName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
