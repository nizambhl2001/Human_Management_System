using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.SalarySetup
{
    public class SalaryPeriodModel
    {
        public int ID { get; set; }
        public string PeriodName { get; set; }
        public string MonthName { get; set; }
        public int YearID { get; set; }
        public string YearName { get; set; }
        public string FinancialYear { get; set; }
        public int TaxYearID { get; set; }
        public string TaxYear { get; set; }
        public string CreatedDate { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
        public int? PeriodValue { get; set; }
        public int? PeriodValueREVERS { get; set; }
        public int? Taxcard { get; set; }
        public DateTime SDate { get; set; }
        public DateTime EDate { get; set; }
    }
}