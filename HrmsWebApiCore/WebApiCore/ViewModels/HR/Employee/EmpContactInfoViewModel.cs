using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels.HR.Employee
{
  public class EmpContactInfoViewModel:EmpContactInfoModel
  {
    public int PreDivisionID { get; set; }
    public string PreDivisionName { get; set; }
    public int PreDistrictID { get; set; }
    public string PreDistrictName { get; set; }
    public int PreUpazilaID { get; set; }
    public string PreUpazilaName { get; set; }
    public int PerDivisionID { get; set; }
    public string PerDivisionName { get; set; }
    public int PerDistrictID { get; set; }
    public string PerDistrictName { get; set; }
    public int PerUpazilaID { get; set; }
    public string PerUpazilaName { get; set; }
    public string PreThanaName { get; set; }
    public string PerThanaName { get; set; }
    public bool IsPresentAddrAsPermanent { get; set; }

  }
}
