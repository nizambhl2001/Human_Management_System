using System;

namespace WebApiCore.Models.Property
{
    public class PropertyDisposalModel
    {
        public int? ID { get; set; }
        public string  EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int CategoryID { get; set; }
        public string Serial { get; set; }
        public string Confiruration { get; set; }
        public int PropertyID { get; set; }
        public int ModelID { get; set; }
        public string Model { get; set; }
        public DateTime DisposeDate { get; set; }
        public string DisType { get; set; }
        public string Note { get; set; }
        public int? CompanyID { get; set; }
    }
}