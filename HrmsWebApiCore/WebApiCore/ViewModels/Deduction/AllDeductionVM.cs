using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Deduction;

namespace WebApiCore.ViewModels.Deduction
{
    public class AllDeductionVM :AllDeductionModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string EmpCode { get; set; }
        public decimal Amount { get; set; }
       
      
    }
}
