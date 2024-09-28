using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class NewJoinModel
    {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public DateTime JoinDate { get; set; }
        public int GradeValue { get; set; }
        public int CompanyID { get; set; }
        public string Enrolment { get; set; }
    }
}
