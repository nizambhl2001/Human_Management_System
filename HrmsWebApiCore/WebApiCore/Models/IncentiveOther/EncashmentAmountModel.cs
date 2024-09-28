using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncentiveOther
{
    public class EncashmentAmountModel
    {
        public int? ID { get; set; }
        public int EmpGrade { get; set; }
        public int SalaryHead { get; set; }
        public decimal Numberoftimes { get; set; }
        public string Note { get; set; }
        public string EDate { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public string AccountName { get; set; }
        public string GradeName { get; set; }
    }
}
