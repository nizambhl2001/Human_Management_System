using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.Models.SalaryProcess
{
    public class EmpSalaryStructureModel
    {
        public int ID { get; set; }
        public int CompanyID { get; set; }
        public int EmpID { get; set; }
        public string EmpCode { get; set; }
        public int StructureID { get; set; }
        public decimal Amount { get; set; }
        public List<SalaryStructureViewModel> EmpAdditionModel { get; set; }
        public List<SalaryStructureViewModel> EmpDeductionModel { get; set; }
    }
}
