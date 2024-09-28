using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Loan
{
    public class StopDeductionSpParametter
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public int PeriodID { get; set; }
        public int? LoanType { get; set; }
        public DateTime? Date { get; set; }
        public string Remarks { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
        public int Grade { get; set; }
        public string Msg { get; set; }
        public int UserTypeID { get; set; }
    }
}
