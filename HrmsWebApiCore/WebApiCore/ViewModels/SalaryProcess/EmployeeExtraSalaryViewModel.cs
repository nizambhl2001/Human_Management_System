using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.ViewModels.SalaryProcess
{
    public class EmployeeExtraSalaryViewModel:EmployeeExtraSalaryModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string PeriodName { get; set; }
        public string AccountName { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal Amount { get; set; }
        public int SalaryTypeID { get; set; }
        public int AccountTypeID { get; set; }
        public string Note { get; set; }
    }
}
