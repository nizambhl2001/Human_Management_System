using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.Models.SalaryProcess
{
    public class EmployeeExtraSalaryModel
    {
        public string EmpCode { get; set; }
        public int? PeriodID { get; set; }
        public int? BonustypeID { get; set; }
        public int? Grade { get; set; }
        public int? CompanyID { get; set; }
        public List<EmployeeExtraSalaryViewModel> empExtraSalary { get; set; }
    }
}
