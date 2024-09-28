using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryPublishModel
    {
        public int ID { get; set; }
        public int CompanyID { get; set; }
        public int PeriodID { get; set; }
        public int Publish { get; set; }
        public string StatusName { get; set; }
        public string PeriodName { get; set; }
    }
}
