using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels.HR.Employee
{
    public class EmpEducationViewModel:EmpEducationInfoModel
    {
        public string DegreeTitle { get; set; }
        public string InstituteName { get; set; }
        public string EducationLevel { get; set; }
        public string YearName { get; set; }
        public string ResultName { get; set; }
        public string GroupName { get; set; }
    }
}