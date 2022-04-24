using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services.Communication.Request
{
    public class BaseRequest<T>
    {
        public RequestMetaData MetaData { get; set; }
        [Required]
        public T Payload { get; set; }
    }
}