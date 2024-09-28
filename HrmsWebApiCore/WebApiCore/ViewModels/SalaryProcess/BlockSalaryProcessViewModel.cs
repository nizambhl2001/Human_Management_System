using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class BlockSalaryProcessViewModel:BlockSalaryProcessModel
    {
        public int StructureID { get; set; }
        public string EmpName { get; set; }
        public string EmpCode { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
    }
}
