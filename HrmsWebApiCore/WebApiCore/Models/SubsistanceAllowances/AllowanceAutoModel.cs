using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SubsistanceAllowances
{
    public class AllowanceAutoModel
    {
        public string EmpCode { get; set; }
        public int Amount { get; set; }
        public int SubAmount { get; set; }
        public int Action { get; set; }
        public string Description { get; set; }
        public int SalaryHead { get; set; }
        public int PaydDays { get; set; }
        public int DayofMonths { get; set; }
        public int SalaryPeriodID { get; set; }
        public int PaidPeriodID { get; set; }
        public string PaymentDate { get; set; }
        public int PaymentType { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
    }
}
