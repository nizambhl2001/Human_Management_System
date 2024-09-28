using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class EmpEnrolmentViewModel: EmpEnrolmentModel
    {
       public string EmpName { get; set; }
       public string PaymentMethod { get; set; }
       public string BankName { get; set; }
       public string BankBranchName { get; set; }
       public string GradeName { get; set; }
       public string PeriodName { get; set; }
       public int EffectivePeriodID { get; set; }
        public string PrePayScaleName { get; set; }
        public string IncrementPayScaleName { get; set; }
    }
}
