namespace WebApiCore.Models.HR.Employee
{
    public class EmpReferenceModel
    {
        public int Id { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }
        public string Organization { get; set; }
        public string Designation { get; set; }
        public string Relationship { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Remarks { get; set; }
        public int CompanyID { get; set; }
    }
}