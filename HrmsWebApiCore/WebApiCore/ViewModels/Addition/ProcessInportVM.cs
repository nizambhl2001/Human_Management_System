using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Addition;

namespace WebApiCore.ViewModels.Addition
{
    public class ProcessInportVM:ProcessImportAdditionModel
    {
        public string EmpName { get; set; }
        public  string Designation { get; set; }
        public string Department { get; set; }
        public string EmpCode { get; set; }
        public decimal Amount { get; set; }
    }
}
