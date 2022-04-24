using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CV.API.Domain.Entities
{
    public class Todo : BaseEntity
    { 
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? DueDate { get; set; }
        public Guid? Assignee { get; set; }
        public Guid? TodoTypeId { get; set; }
        public Guid? TodoStatusId { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? PriorityId { get; set; }
        public int? PositionX { get; set; }
        public int? PositionY { get; set; }
        public int? PositionW { get; set; }
        public int? PositionH { get; set; } 
        public bool? IsArchived { get; set; } 

        public virtual User AssigneeNavigation { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual Project Project { get; set; }
        public virtual TodoStatus TodoStatus { get; set; }
        public virtual TodoType TodoType { get; set; }
    }
}
