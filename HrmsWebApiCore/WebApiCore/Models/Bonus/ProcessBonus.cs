using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Bonus
{
    public class ProcessBonus
    {
        public int companyid { get; set; }
        public int SalaryHeadID { get; set; }
        public int Bonustype { get; set; }
        public int PeriodID { get; set; }
    }
}
