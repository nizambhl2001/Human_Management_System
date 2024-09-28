using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.SalarySetup
{
    public class SalaryHeadModel
    {
        public int ID { get; set; }
        public string AccountName { get; set; }
        public string AccountCode { get; set; }
        public string SalaryHeadType { get; set; }
        public int? AccountTypeID { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
        public int? SLNo { get; set; }
        public string IsIncomeTax { get; set; }
        public string IsInvestments   {get;set;}
        public int Isaddordeduct { get; set; }
}
}