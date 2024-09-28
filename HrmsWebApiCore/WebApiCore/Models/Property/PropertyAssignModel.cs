using System;

namespace WebApiCore.Models.Property
{
    public class PropertyAssignModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string ReciveFrom { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string FromEmpName { get; set; }
        public string FromDesignation { get; set; }
        public int PropertyID { get; set; }
        public int ModelID { get; set; }
        public string Model { get; set; }
        public int CategoryID { get; set; }
        public string Serial { get; set; }
        public string Confiruration { get; set; }
        public DateTime AssainDate { get; set; }
        public int AssainType { get; set; }
        public int? Status { get; set; }
        public int CompanyID { get; set; }
        public string OwnershipDate{ get; set; }
    }
}