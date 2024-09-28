using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class JoiningInfoModel
    {
        public int? id { get; set; }
        public string EmpCode { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Grade { get; set; }
        public string JoiningDate { get; set; }
        public string Salary { get; set; }
    }
}
