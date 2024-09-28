namespace WebApiCore.Models.HR.Employee
{
    public class EmpContactInfoModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public int? PreThanaID { get; set; }
        public int? PerThanaID { get; set; }
        public string PrePostOffice { get; set; }
        public string PerPostOffice { get; set; }
        public string PreVillage { get; set; }
        public string PerVillage { get; set; }
        public string PersonName { get; set; }
        public string PersonContact { get; set; }
        public string PersonAddress { get; set; }
        public int? CompanyID { get; set; }
        public string Relationship { get; set; }
        public int? PreCountry { get; set; }
        public int? PerCountry { get; set; }
        public string PrePostCode { get; set; }
        public string PerPostCode { get; set; }
        public string MailingAddress { get; set; }
        public string SecondaryMobile { get; set; }
        public string SecandaryMail { get; set; }
        public string SocialURL1 { get; set; }
        public string SocialURL2 { get; set; }
        public string EmergrncyPostCode { get; set; }
        public int? EmergrncyPostCountry { get; set; }
    }
}