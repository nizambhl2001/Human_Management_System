using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.OverTime
{
    public class OtProcessModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string OtMonth { get; set; }
        public double TotalHour { get; set; }
        public double BasicSalary { get; set; }
        public double PayAmount { get; set; }
        public string BankName { get; set; }
        public string AccNo { get; set; }
        public int CompanyID { get; set; }
    }
}
