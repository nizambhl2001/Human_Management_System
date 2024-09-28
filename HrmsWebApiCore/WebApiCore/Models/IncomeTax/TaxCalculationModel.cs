using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class TaxCalculationModel
    {
        public string EmpCode { get; set; }
        public int PeriodID { get; set; }
        public int CompanyID { get; set; }
        public int Grade { get; set; }
        public int UserTypeID { get; set; }
        public int TaxYearID { get; set; }
        public string PeriodName { get; set; }
        public int BonusTypeID { get; set; }
    }
}
