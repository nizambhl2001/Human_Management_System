using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.Addition
{
    public class DriverAllowanceShowModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public decimal Amount { get; set; }
        public int CompanyID { get; set; }
        public int DepertmentID { get; set; }
    }
}