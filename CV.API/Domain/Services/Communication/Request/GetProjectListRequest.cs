using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class GetProjectListRequest
    {
        public bool IsArchived { get; set; }
    }
}
