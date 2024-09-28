using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.ViewModels.IncomeTax
{
    public class ChallanPrepareViewModel: ChallanPrepairModel
    {
        
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
    }
}
