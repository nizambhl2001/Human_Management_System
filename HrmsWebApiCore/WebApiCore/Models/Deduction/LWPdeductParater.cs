using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Deduction
{
    public class LWPdeductParater
    {
        public int TaxYearID { get; set; }
        public int PeriodID { get; set; }
        public string PeriodName { get; set; }
        public int YearID { get; set; }
        public int SalaryHeadID { get; set; }
        public string EmpCode { get; set; }
        public int CompanyID { get; set; }
        public int Grade { get; set; }
        public string Department { get; set; }
        public string StrDate { get; set; }
        public string Enddate { get; set; }
        public int UserTypeID { get; set; }
    }
}
