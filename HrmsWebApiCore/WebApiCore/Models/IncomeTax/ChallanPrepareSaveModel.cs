using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class ChallanPrepareSaveModel
    {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal Amount { get; set; }
        public int BonusType { get; set; }
    }
}
