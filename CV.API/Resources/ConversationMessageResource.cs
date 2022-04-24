using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Resources
{
    public class ConversationMessageResource
    {
        public Guid Id { get; set; }
        public Guid ConversationId { get; set; }
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public string LovedByUids { get; set; }
        public string SeenByUids { get; set; }
        public DateTime? SendDate { get; set; }
    }
}
