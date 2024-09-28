using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class SalaryStructureViewModel: SalaryStructureModel
    {
        public string TypeName { get; set; }
        public string BasedOnName { get; set; }
        public string AccountName { get; set; }
        public string AccountCode { get; set; }
    }
}
