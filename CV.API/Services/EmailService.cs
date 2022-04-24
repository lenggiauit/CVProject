using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services;  
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task Send(string from, string to, string subject, string content)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = content + _appSettings.MailSignature };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.SslOnConnect);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task Send(string to, string subject, string content)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_appSettings.MailSender));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = content + _appSettings.MailSignature };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.None);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
