using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class UndoSalaryProcessModel
    {
        public int ID { get; set; }
        public int PeriodID { get; set; }
        public int Grade { get; set; }
        public int CompanyID { get; set; }
        public int UserTypeID { get; set; }
        public string PeriodName { get; set; }
    }
}
