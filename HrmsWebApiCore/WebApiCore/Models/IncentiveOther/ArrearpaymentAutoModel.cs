using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncentiveOther
{
    public class ArrearpaymentAutoModel
    {
        public int StartPeriod { get; set; }
        public int ComparePeriod { get; set; }
        public int ArrearPeriod { get; set; }
        public string ArrearDate { get; set; }
        public string IncrementDate { get; set; }
        public int CompantID { get; set; }
        public int BonusTYpe { get; set; }
        public int grade { get; set; }
        public string EmpCode { get; set; }
    }
}
