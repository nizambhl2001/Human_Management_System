using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.Models.SalaryProcess
{
    public class BlockSalaryProcessModel
    {
        public int PeriodID  {get;set;}
        public int TaxYearID {get;set;}
        public string PeriodName  {get;set;}
        public int YearID  {get;set;}
        public int Salaryhead { get; set; }
        public string EmployeeCode  {get;set;}
        public int CompanyID {get;set;}
        public int Grade  {get;set;}
        public int UserTypeID { get; set; }
        public int Bonustype { get; set; }
        public List<BlockSalaryProcessViewModel> BlockSalaryViewModel { get; set; }
    }
}
