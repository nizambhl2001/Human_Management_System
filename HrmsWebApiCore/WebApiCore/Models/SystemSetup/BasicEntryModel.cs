namespace WebApiCore.Models.SystemSetup
{
  public class BasicEntryModel
  {
    public int? ID { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
    public int SortOrder { get; set; }
    public int CompanyID { get; set; }
    public int ISActive { get; set; }
    public string Address { get; set; }
    public string TableName { get; set; }
    public int UserID { get; set; }
    public string TypeName { get; set; }
    }
}
