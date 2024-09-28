using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncentiveOther
{
    public class LeaveTypeSetupModel
    {
        public int? ID { get; set; }
        public int EmpGrade { get; set; }
        public int LeaveTypeID { get; set; }
        public decimal Numberoftimes { get; set; }
        public string Note { get; set; }
        public string EDate { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public int GradeValue { get; set; }
        public string TypeName { get; set; }
        public string GradeName { get; set; }
    }
}
