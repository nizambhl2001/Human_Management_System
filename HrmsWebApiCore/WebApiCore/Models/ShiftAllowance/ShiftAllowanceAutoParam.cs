using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.ShiftAllowance
{
    public class ShiftAllowanceAutoParam
    {
        public string EmpCode { get; set; }
        public int GradeValue { get; set; }
        public int? DepertmentID { get; set; }
        public int? BranchID { get; set; }
        public string StrDate { get; set; }
        public string EndDate { get; set; }
        public int CompanyID { get; set; }
        public int? Unite { get; set; }
        public int? Line { get; set; }
        public  int UserTypeID { get; set; }
    }
}
