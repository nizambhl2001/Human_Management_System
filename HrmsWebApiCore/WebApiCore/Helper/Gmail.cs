using System.Net;
using System.Net.Mail;

namespace WebApiCore.Helper
{
    public class Gmail
    {
        private static NetworkCredential _credentials;
        private readonly bool _isBodyHtml;
        public Mail Mail = new Mail();

        public Gmail(bool isBodyHtml)
        {
            _isBodyHtml = isBodyHtml;
        }

        private SmtpClient Client()
        {
            var client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = _credentials
            };
            return client;
        }

        public bool Send()
        {
            var mail = new MailMessage();
            mail.From = new MailAddress(_credentials.UserName);
            mail.To.Add(Mail.To);
            mail.Subject = Mail.Subject;
            mail.IsBodyHtml = _isBodyHtml;
            mail.Body = Mail.Body;

            try
            {
                var gmail = Client();
                gmail.Send(mail);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Login(string email, string password)
        {
            _credentials = new NetworkCredential(email, password);
        }
    }

    public class Mail
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}