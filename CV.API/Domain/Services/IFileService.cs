using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services
{
    public interface IFileService
    {
        Task<string> UploadImage(IFormFile file, string path);
        Task<string> UploadTemplateZipFile(IFormFile file, string path);
    }
}
