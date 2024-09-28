using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.OverTime
{
    public class OtRequisitionDetailsModel
    {
        public int? ID { get; set; }
        public int? OtRequisitionMasterID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public DateTime OtDate { get; set; }
        public double OtHours { get; set; }
        public bool IsReplace { get; set; }
        public double? ApprovedHours { get; set; }
    }
}
