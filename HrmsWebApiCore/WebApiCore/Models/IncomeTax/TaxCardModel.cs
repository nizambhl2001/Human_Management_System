using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class TaxCardModel
    {
        public string EmpCode { get; set; }
        public int TaxYearID { get; set; }
        public int? PeriodID { get; set; }
        public int CompanyID { get; set; }
    }
}
