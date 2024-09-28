using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels;

namespace WebApiCore.Models.IncentiveOther
{
    public class SubtitutionLeaveAmountModel
    {
        public string EmpCode { get; set; }
        public int SalaryPeriodID { get; set; }
        public int PaymentPeriodID { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal Amount { get; set; }
        public decimal OTPP { get; set; }
        public int BonusType { get; set; }
        public string Date { get; set; }
        public int CompanyID { get; set; }
        public int DepertmentID { get; set; }
    }
}
