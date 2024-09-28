using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.OverTime
{
    public class OtManualEntryModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        /// <summary>
        /// Ot Month should be yyyyMM format
        /// </summary>
        public string OtMonth { get; set; }
        public double OtHours { get; set; }
        public int CompanyID { get; set; }
        public DateTime? AddedDate { get; set; }
        public int UserID { get; set; }
    }
}
