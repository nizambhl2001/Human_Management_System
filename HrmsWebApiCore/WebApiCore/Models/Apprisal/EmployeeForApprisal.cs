using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class EmployeeForApprisal
    {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Employee { get; set; }
        public string Boss { get; set; }
        public int IsBossEdit { get; set; }
        public string Apprisal { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string ReportTo { get; set; }
        public string ReportName { get; set; }
        public DateTime JoinDate { get; set; }
    }
}
