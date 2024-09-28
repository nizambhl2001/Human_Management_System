using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.ShiftAllowance
{
    public class ShiftAmountSetupModel
    {
        public int ID { get; set; }
        public int EmployeeType { get; set; }
        public int ShiftID { get; set; }
        public decimal Amount { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
      



    }
}
