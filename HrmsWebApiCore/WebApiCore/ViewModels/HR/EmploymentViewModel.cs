using WebApiCore.Models.HR;

namespace WebApiCore.ViewModels.HR
{
    public class EmploymentViewModel : EmploymentModel
    {
        //public string EmpName { get; set; }
        public int? Gender { get; set; }
        public string BusinessNature { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        //public int? GradeValue { get; set; }
        public string ProjectName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLocation { get; set; }
        public string CompanyAddress { get; set; }
    }
}
