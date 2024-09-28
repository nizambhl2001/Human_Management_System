using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryGradePayScale
    {
        public int ID { get; set; }
        public int PayscaleID { get; set; }
        public int SalaryHeadID { get; set; }
        public decimal? Amount { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }

        // unused fild
        public string GradeName { get; set; }
    }
}
