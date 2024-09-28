using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class SearchChargeSetupModel
    {
        public int  ID {get;set;}
        public int TaxYear {get;set;}
        public string SlabName {get;set;}
        public string SlabAmount  {get;set;}
        public decimal Persentage  {get;set;}
        public string Note {get;set;}
        public DateTime setupDate  {get;set;}
        public int CompanyID {get;set;}
    }
}
