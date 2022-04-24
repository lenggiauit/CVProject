using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string SubFolder { get; set; }
        public string MailSender { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
        public string MailSignature { get; set; }
        public string MailDefaultSubject { get; set; }
        public string MailDefaultContent { get; set; }
        public string GoogleapisUrl { get; set; } 
        public string MailForgotPasswordSubject { get; set; }
        public string MailForgotPasswordContent { get; set; } 
        public string ForgotPasswordUrl { get; set; }
        public string ClientErrorMappingUrl { get; set; }
        public string FileFolderPath { get; set; }
        public string TemplateFolderPath { get; set; }
        public string[] TemplateSupportExtension { get; set; }
        public string FileRequestUrl { get; set; }
        public string TemplateRequestUrl { get; set; }
        public string AllowOriginUrl { get; set; }
        public string AllowOriginUrl1 { get; set; }
        public string AllowOriginUrl2 { get; set; }
        public string AllowOriginUrl3 { get; set; }
        public string AllowOriginUrl4 { get; set; } 
        public int DefaultPageSize { get; set; }


    }
}
