using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.FinalSattlement
{
    public class FinalSettlementParam
    {
        public string EmpCode { get; set; }
        public DateTime LastWorkingDate { get; set; }
        public int CompanyID { get; set; }
        public int PeriodID { get; set; }
        public int? comnoticeday { get; set; }
        public int? empnoticeday { get; set; }
        public int calculationtype { get; set; }
        public int Nodeduct { get; set; }
        public  int grade { get; set; }
        public int Bonustype { get; set; }
        public string empCode1 { get; set; }
    }
}
