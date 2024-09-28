using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRMS.Models.Addition;

namespace HRMS.ViewModels.Addition
{
    public class DriverBonusVM
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public  string EmpCode { get; set; }
        public Decimal Amount { get; set; }
        public int CompanyID { get; set; }
    }
}