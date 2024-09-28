using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class ConformationIncrementModel
    {   public int ID {get;set;}
        public string EmpCode {get;set;}
        public string EmpName {get;set; }
        public int Type {get;set;}
        public DateTime Date {get;set;}
        public int PrePayscaleID {get;set;}
        public string PrePayScaleName {get;set; }
        public int IncrementPacyscaleID { get;set;}
        public string IncrementPayScaleName {get;set; }
        public int CompanyID {get;set;}
        public string ProvidentFund { get; set; }
        public string ConformationDate { get; set; }
    }
}
