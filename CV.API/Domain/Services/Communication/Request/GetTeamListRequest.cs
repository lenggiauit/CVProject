using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class GetTeamListRequest
    {
        public Guid? UserId { get; set; }
        public Guid? ProjectId { get; set; }
    }
}
