namespace Dapper.Framework
{
    public class ConnectionString
    {
        public string Server { get; set; }
        public string IntegratedSecurity { get; set; }
        public string Database { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
    }
}