using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.ViewModels.Bonus
{
    public class FestivalBonusViewModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public decimal? BonusAmount { get; set; }
        public string EmpCode { get; set; }
        public decimal? Amount { get; set; }
        public int? DepartmentID { get; set; }
        public int? DepertmentID { get; set; }
        public string Department { get; set; }
        public int? DesignationID { get; set; }
        public int? PeriodID { get; set; }
        public string AccountName { get; set; }
        public int? SalaryHeadID { get; set; }
        public int? BonusType { get; set; }
    }
}
