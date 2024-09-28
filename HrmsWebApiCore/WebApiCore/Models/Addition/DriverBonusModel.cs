using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.Addition
{
    public class DriverBonusModel
    {
        public int ID { get; set; }
        public List<DriverAllowanceShowModel> SelectedDriver { get; set; }
        public int SalaryHeadID { get; set; }
        public int PeriodID { get; set; }
        public int BonusID { get; set; }
        public int CompanyID { get; set; }
        public DateTime? PDate  { get; set; }
        public int? UserID { get; set; }
    }
}