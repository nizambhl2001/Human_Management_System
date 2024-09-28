using System;

namespace WebApiCore.Models.HR
{
  public class EmpCompanyTransferModel
  {
    public int? ID { get; set; }
    public string EmpCode { get; set; }
    public int? PreCompanyID { get; set; }
    public int? PreDepartmentID { get; set; }
    public int? PreProjectID { get; set; }
    public int? PreDesignationID { get; set; }
    public int? PreDivisionID { get; set; }
    public int? PreBranchID { get; set; }
    public int? PreUnit { get; set; }
    public int? PreLocation { get; set; }
    public int? PreGrade { get; set; }
    public int? PrePayscaleGrade { get; set; }
    public int? PasCompanyID { get; set; }
    public int? PasDepartmentID { get; set; }
    public int? PasProjectID { get; set; }
    public int? PasDesignationID { get; set; }
    public int? PasDivisionID { get; set; }
    public int? PasBranchID { get; set; }
    public int? PasUnit { get; set; }
    public int? PasLocation { get; set; }
    public int? PasGrade { get; set; }
    public int? PasPayscaleGrade { get; set; }
    public DateTime TransferDate { get; set; }
    public string Note { get; set; }
    public int? TPType { get; set; }
    public int? CompanyID { get; set; }
    public int? PreSectionID { get; set; }
    public int? PasSectionID { get; set; }
    public string jobresponsibilities { get; set; }
    public decimal? PreAmount { get; set; }
    public decimal? PasAmount { get; set; }
  }
}
