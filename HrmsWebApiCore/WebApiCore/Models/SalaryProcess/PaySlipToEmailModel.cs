using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class PaySlipToEmailModel
    {
        public int Id { get; set; }
        public int CompanyID { get; set; }
        public string EmpCode { get; set; }
        public string EmailID { get; set; }
        public string FileName { get; set; }
        public string FileLocation { get; set; }
        public string CreatedDate { get; set; }
        public int PeriodID { get; set; }
        public int Grade { get; set; }

    }
}
