using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Helpers
{
    public interface IFileWriter
    {
        Task<string> UploadImage(IFormFile file, string path);
        Task<string> UploadFile(IFormFile file, string path);
    } 

    public class FileWriter : IFileWriter
    {
        public async Task<string> UploadImage(IFormFile file, string path)
        {
            if (CheckIfImageFile(file))
            {
                return await WriteFile(file, path);
            }
            return string.Empty;
        }

        public async Task<string> UploadFile(IFormFile file, string path)
        {
            return await WriteFile(file, path); 
        }

        private bool CheckIfImageFile(IFormFile file)
        {
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            return WriterHelper.GetImageFormat(fileBytes) != WriterHelper.ImageFormat.unknown;
        }

        public async Task<string> WriteFile(IFormFile file, string filePath)
        {
            string fileName;
            try
            {
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                fileName = Guid.NewGuid().ToString() + extension;
                var path = Path.Combine(filePath, fileName);

                using (var bits = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(bits);
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }

            return fileName;
        }
    }
}