using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class ChallanPrepairModel
    {
        public int ID {get;set;}
        public string EmpCode {get;set;}
        public int PeriodID {get;set;}
	    public int TaxYearID {get;set;}
	    public int SalaryHeadID {get;set;}
	    public decimal Amount  {get;set;}
	    public string ChallanNo{get;set;}
	    public DateTime ChallanDate  {get;set;}
	    public int GruopID {get;set;}
	    public string GLNo {get;set;}
	    public int CompanyID {get;set;}
	    public int PaymentType {get;set;}
	    public int BonusType  {get;set;}
        public List<ChallanPrepareSaveModel> Details { get; set; }

    }
}
