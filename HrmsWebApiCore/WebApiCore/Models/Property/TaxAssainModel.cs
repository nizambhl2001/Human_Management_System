using System;

namespace WebApiCore.Models.Property
{
    public class TaxAssainModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation{ get; set; }
        public DateTime JoiningDate { get; set;}
        public DateTime AssainDate { get; set; }
        public int Type{ get; set; }
        public int Active { get; set; }
        public int CompanyID { get; set; }
    }
}
