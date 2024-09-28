using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.DbContext.SalarySetup
{
    public class DetailsPayscaleSetupModel
    {
       
      
        public string GradeDescription { get; set; }
        public decimal IncrementAmount { get; set; }
        public decimal Basic { get; set; }
        public decimal Hrent { get; set; }
        public decimal DA { get; set; }
        public decimal Others { get; set; }
        public decimal Convance { get; set; }
        public decimal Medicale { get; set; }
        public decimal Beverage { get; set; }
        public decimal Incentive { get; set; }
        public decimal Entertainment { get; set; }
       
    }
}
