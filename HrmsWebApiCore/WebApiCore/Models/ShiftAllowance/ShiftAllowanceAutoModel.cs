using HRMS.Models.Addition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.ShiftAllowance;

namespace WebApiCore.Models.ShiftAllowance
{
    public class ShiftAllowanceAutoModel
    {
        public int ID { get; set; }
        public List<ShiftAutoAllowanceVM> Details { get; set; }
        public string EmpCode { get; set; }
        public int PeriodID { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal Amount { get; set; }
        public decimal OTPP { get; set; }
        public int BonusType { get; set; }
        public string Date { get; set; }
        public int CompanyID { get; set; }
        public int? DepertmentID { get; set; }
    }
}
