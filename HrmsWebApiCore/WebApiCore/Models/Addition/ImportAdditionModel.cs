using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Addition
{
    public class ImportAdditionModel
    {
        public int ID { get; set; }
        public int SalaryHead { get; set; }
        public int PeriodID { get; set; }
        public int CompanyID { get; set; }
        public string PeriodName { get; set; }
        public int Grade { get; set; }
    }
}
