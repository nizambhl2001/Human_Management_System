using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiCore.Models.Leave;

namespace HRMS.Models.Leave
{
    public class EarnLeaveBalanceModel
    {
        public int? ID { get; set; }
        public int LType { get; set; }
        public int YearID { get; set; }
        public DateTime DATE { get; set; }
        public string Note { get; set; }
        public int CompanyID { get; set; }
        public List<EarnLeaveBalanceDetailsModel> Details { get; set; }
    }
}