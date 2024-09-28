using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRMS.Models.ShiftAllowance;

namespace HRMS.ViewModels.ShiftAllowance
{
    public class ShiftAllowanceAssignView
    {
        public  int ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int GradeValue { get; set; }
        public int DepartmentID { get; set; }
        public int DesignationID { get; set; }
        public int BranchID { get; set; }
        public int Location { get; set; }
        public string AssainType { get; set; }
        public int CompanyID { get; set; }
    }
}

