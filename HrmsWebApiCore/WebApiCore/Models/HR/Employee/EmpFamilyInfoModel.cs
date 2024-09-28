namespace WebApiCore.Models.HR.Employee
{
    public class EmpFamilyInfoModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string PersonName { get; set; }
        public string DOB { get; set; }
        public string POB { get; set; }
        public string DistrictName { get; set; }
        public int? BloodGroup { get; set; }
        public string  Relationship { get; set; }
        public int? Gender { get; set; }
        public int? MaritalStatus { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public string IsNominee { get; set; }
        public double Percentage { get; set; }
        public string Occupation { get; set; }
        public string PassportNo { get; set; }
        public string NationalID { get; set; }
        public int CompanyID { get; set; }
        public byte[] Photo { get; set; }
        public byte[] Signature { get; set;}
    }
}
