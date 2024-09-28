using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels.HR.Employee
{
  public class EmpFamilyInfoViewModel:EmpFamilyInfoModel
  {
    public string GenderName { get; set; }
    public double UsedPer { get; set; }
    public double UnusedPer { get; set; }
    public int NomineeCount { get; set; }
    public string BloodGroupName { get; set; }
    public string MaritalStatusName { get; set; }
  }
}
