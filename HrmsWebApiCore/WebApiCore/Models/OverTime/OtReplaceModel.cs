using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.OverTime
{
    public class OtReplaceModel
    {
        public int? ID { get; set; }
        public int? OtRequisitionDetailsID { get; set; }
        public string EmpCode { get; set; }
        public double ReplacedHours { get; set; }
        public DateTime ReplacedDate { get; set; }
        public DateTime ApplyDate { get; set; }
        public DateTime OtDate { get; set; }
        public int CompanyID { get; set; }

    }
}
