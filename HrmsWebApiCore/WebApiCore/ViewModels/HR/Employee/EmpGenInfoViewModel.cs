using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels.HR.Employee
{
  public class EmpGenInfoViewModel:EmpGenInfoModel
  {
    public string FullName { get; set; }
    public string FirstName { get; set; }
    public string NickName { get; set; }
    public string FatherName { get; set; }
    public string MoitherName { get; set; }
    public string SpouseName { get; set; }
    public string MaritalStatus { get; set; }
    public int GenderID { get; set; }
    public int BloodGroupID { get; set; }
    public int ReligionID { get; set; }
    public int MaritalStatusID { get; set; }
    public int NationalityID { get; set; }
    public int MotherOccupationID { get; set; }
    public int FatherOccupationID { get; set; }
  }
}
