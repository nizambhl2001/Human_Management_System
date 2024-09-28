using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class TaxChallanModel
    {
       public int  ID {get;set; }
       public int TaxYearID {get;set; }
       public string TaxChallanNo {get;set; }
       public string ChallanDate {get;set; }
       public int SalaryPeriodID {get;set; }
       public string CreatedDate {get;set; }
       public int  CompanyID {get;set; }
    }
}
