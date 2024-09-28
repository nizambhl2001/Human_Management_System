using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncentiveOther;

namespace WebApiCore.ViewModels
{
    public class SubtitutionLeaveAmountViewModel: SubtitutionLeaveAmountModel
    {
        public int BranchID { get; set; }
        public int DepartmentID { get; set; }
        public int YearID { get; set; }
        public int GradeValue { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
    }
}
