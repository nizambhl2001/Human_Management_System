using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Bonus
{
    public class processImportView:ProcessBonus
    {
        public string EmpName { get; set; }
        public string EmpCode { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public decimal BonusAmount { get; set; }
        public decimal Amount { get; set; }
    }
}
