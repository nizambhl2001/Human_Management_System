using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class SalaryEditViewModel: SalaryEditModel
    {
        public decimal Amount { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string AccountName { get; set; }

    }
}
