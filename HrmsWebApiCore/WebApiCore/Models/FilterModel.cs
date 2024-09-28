using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models
{
    public class FilterModel
    {
        public FilterModel()
        {
            DepartmentID = -1;
            DesignationID = -1;
            Location = "-1";
            BranchID = -1;
            EmpCode = null;
            Unite = -1;
            Line = -1;

        }
        public int CompanyID { get; set; }
        public int? GradeValue { get; set; }
        public int? DepartmentID { get; set; }
        public string Department { get; set; }
        public int? DesignationID { get; set; }
        public string Designation { get; set; }
        public string Location { get; set; }
        public int? BranchID { get; set; }
        public string WorkStation { get; set; }
        public string EmpCode { get; set; }
        public int? Unite { get; set; }
        public int? Line { get; set; }
        public int UserTypeID { get; set; }
    }
}




