using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SubsistanceAllowances
{
    public class SubsistanceAmountModel
    {
        public int? ID { get; set; }
        public int EmpGrade { get; set; }
        public string AccountName { get; set; }
        public string GradeName { get; set; }
        public int SalaryHead { get; set; }
        public decimal NumberoftimesGuilty { get; set;}
        public decimal NumberoftimesNonGuilty { get; set;}	
        public string EDate { get; set; }
        public string Note { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
    }
}
