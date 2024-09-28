using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Attendance;

namespace WebApiCore.ViewModels
{
    public class AttendenceSummaryViewModel : AttendenceSummeryModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int TotalDay { get; set; }
        public int Holiday { get; set; }
        public int Absent { get; set; }
        public int LeaveWithPay { get; set; }
        public int AttendenceDay { get; set; }
        public int LeavewithOutPay { get; set; }
        public string Remarks { get; set; }
    }

    public class AttendanceReportModel
   {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string OfficeBranch { get; set; }
        public string Login { get; set; }
        public string LogOut { get; set; }
        public string Lates { get; set; }
        public string Lates1 { get; set; }
        public string Notes { get; set; }
        public int CompanyID { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? GradeValue { get; set; }
        public int? DepartmentID { get; set; }
        public int? BranchID { get; set; }
        public int? ProjectID { get; set; }
        public int? PeriodID { get; set; }
        public int? ReportId { get; set; }
        public string Location { get; set; } 
        public string TotalMDay { get; set; }
        public string Holyd { get; set; }
        public string LWPQty { get; set; }
        public string LWtPQty { get; set; }
        public string Atten { get; set; }
        public string dd { get; set; }
        public string Day { get; set; }
        public string Times { get; set; }
        public string Dates { get; set; }
        public string ShiftStartMin { get; set; }
        public string ShiftStartHour { get; set; }
        public string BranchName { get; set; }
        public string attnDate { get; set; }
        public string WorkingHour { get; set; }
    }

    public class AttendanceReportModel2
    {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string OfficeBranch { get; set; }
        public int CompanyID { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string TodalMDay { get; set; }
        public string Holyd { get; set; }
        public string IWPQty { get; set; }
        public string IWtPQty { get; set; }
        public string Atten { get; set; }
        public string Lates { get; set; }
    }
}
