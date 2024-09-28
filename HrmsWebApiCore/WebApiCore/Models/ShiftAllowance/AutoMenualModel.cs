using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.ShiftAllowance
{
    public class AutoMenualModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public int PeriodID { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal Amount { get; set; }
        public decimal OTPP { get; set; }
        public int BonusType { get; set; }
        public DateTime Date{get;set;}
        public int CompanyID { get; set; }
        public int DepertmentID { get; set; }
}
}