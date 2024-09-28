using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class PaysacleOutAddDeductModel
    {   public int ID  {get;set;}
        public string EmpCode  {get;set;}
        public int  SalaryHeadID {get;set;} 
        public decimal Amount {get;set;} 
        public DateTime StartDate {get;set;} 
        public DateTime EndDate {get;set;} 
        public int Allowancetype {get;set;} 
        public int CompanyID {get;set;}
        public string AccountName { get; set; }

    }
}
