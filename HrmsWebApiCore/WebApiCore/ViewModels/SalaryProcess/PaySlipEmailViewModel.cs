using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class PaySlipEmailViewModel: PaySlipToEmailModel
    {
       
        public string EmpName { get; set; }

    }
}
