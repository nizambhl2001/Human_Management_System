using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Attendance
{
    public class AssignedShiftFilterModel
    {
        public int CompanyID { get; set; }
        public int? DepartmentID { get; set; }
        public int? DesignationID { get; set; }
        public int? LocationID { get; set; }
        public string EmpCode { get; set; }
        public DateTime FromDate { get; set; }
        public string ReportTo { get; set; }
        public int? ShiftID { get; set; }
        public DateTime ToDate { get; set; }
    }
}
