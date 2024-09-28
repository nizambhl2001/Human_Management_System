using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Addition
{
    public class ProcessSalaryLockModel
    {
        public int ID { get; set; }
        public int SalaryPeriod { get; set; }
        public DateTime LockDate { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public int EmpType { get; set; }
        public string PeriodName { get; set; }
        public int Grade { get; set; }
    }
}
