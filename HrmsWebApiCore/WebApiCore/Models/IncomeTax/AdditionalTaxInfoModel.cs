using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class AdditionalTaxInfoModel
    {
            public int  ID {get;set;}
            public string  EmpCode {get;set;}
            public int  SalaryHeadID {get;set;}
            public decimal ExemptAmount {get;set;}
            public decimal ExemptPercent {get;set;}
            public string ExemptRule {get;set;}
            public int TaxYearID {get;set;}
            public int CompanyID {get;set;}
            public string AccountName { get; set; }
            public string EmpName { get; set; }
    }
}
