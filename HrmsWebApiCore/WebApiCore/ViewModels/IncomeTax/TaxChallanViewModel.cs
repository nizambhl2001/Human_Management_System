using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.ViewModels.IncomeTax
{
    public class TaxChallanViewModel: TaxChallanModel
    {
        public string TaxYearName { get; set; }
        public string PeriodName { get; set; }
        

    }
}
