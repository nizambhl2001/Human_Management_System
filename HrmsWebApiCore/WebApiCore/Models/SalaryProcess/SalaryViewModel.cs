using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryViewModel
    {
        public string EpmCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public int SalaryHeadType { get; set; }
        public string AccountName { get; set; }
        public decimal Amount { get; set; }
        public string SalaryType { get; set; }
    }
}
