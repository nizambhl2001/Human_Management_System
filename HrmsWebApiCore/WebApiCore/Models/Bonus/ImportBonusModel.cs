using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Bonus
{
    public class ImportBonusModel
    {
        public int? ID { get; set; }
        public int SalaryHead { get; set; }
        public int PeriodID { get; set; }
        public int BonusType { get; set; }
        public int CompanyID { get; set; }
        public string PeriodName { get; set; }
        public int Grade { get; set; }
    }
}
