using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models
{
    public class AdditionNDDeductionGetAllParam
    {
        private AdditionNDDeductionGetAllParam()
        {

            CompanyID = 1;
            Department = null;
            TaxYearID = -1;
            PeriodName = null;
            YearID = -1;
            EmpCode = null;

        }

        public int? TaxYearID { get; set; }
        public int? PeriodID { get; set; }
        public string PeriodName { get; set; }
        public int? YearID { get; set; }
        public int SalaryHeadID { get; set; }
        public string EmpCode { get; set; }
        public int CompanyID { get; set; }
        public int Grade { get; set; }
        public string Department { get; set; }
        public decimal? Days { get; set; }
        public int UserTypeID { get; set; }
    }
}
