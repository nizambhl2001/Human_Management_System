using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SystemSetup
{
    public class BankBranchModel
    {
        public int  ID  {get;set;}
        public string Description  { get; set; }
        public string Address  { get; set; }
        public int BankID {get;set;}
        public int SortOrder  {get;set;}
	    public int CompanyID  {get;set;}
	    public int ISActive {get;set;}
        public string BankName { get; set; }
    }
}
