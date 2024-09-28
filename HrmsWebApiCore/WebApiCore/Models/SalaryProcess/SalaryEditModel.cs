using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryEditModel
    {
         public string EmpCode  { get; set; }
         public int? PeriodID  { get; set; }
         public int? DepartmentID { get; set; }
         public int? DesignationID  {get;set;}
         public int? SalaryHeadID  {get;set;}
         public int CompanyID  {get;set;}
         public int? Grade {get;set;}
         public List<SalaryEditViewModel> SalaryEditView { get; set; }
    }
}
