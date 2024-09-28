using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class SalaryLockModel
    {
        public int? ID { get; set; }
        public int SalaryPeriod { get; set; }
        public DateTime? LockDate { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public int EmpType { get; set; }
        /// <summary>
        /// ActionType=1 for lock
        /// ActionType=2 for unlock
        /// </summary>
        ///
        public int ActionType {get;set;}
    }
}
