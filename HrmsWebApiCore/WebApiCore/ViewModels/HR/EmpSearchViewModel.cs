using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.HR
{
    public class EmpSearchViewModel
    {
        public string EmpCode { get; set; }
        public int Id { get; set; }
        public string EmpName { get; set; }
        public int DepartmentID { get; set; }
        public decimal? Amount { get; set; }
        public string Department { get; set; }
        public string OfficeBranch { get; set; }
        public int DesignationID { get; set; }
        public  string Designation { get; set; }
        public int JobLocation { get; set; }
        public int CompanyID { get; set; }
        public int GradeValue { get; set; }
        public DateTime joinDate { get; set; }
        public string IsBlock { get; set; }
        public string Status { get; set; }
        public string LSDate { get; set; }
        public string leaveNumber { get; set; }
        public string Emp { get; set; }
        public string Lates { get; set; }
        public string TotalEmp { get; set; }
        public string TotalAbsent { get; set; }
        public string Leave { get; set; }
        public string TotalleavePending { get; set; }
        public string TotalWeekend { get; set; }
    }

    public class EmpDetailsViewModel
    {

        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Branch { get; set; }
        public string Login { get; set; }
        public string ShiftStartMin { get; set; }
        public string LSDate { get; set; }
        public string LEDate { get; set; }

    }
    public class EmpDetailsModel
    {

        public int CompId { get; set; }
        public string CurrentDate { get; set; }
        public int? ProjectID { get; set; }
        public int? RepCode { get; set; }
        public int? JobLocation { get; set; }
        public int? DepartmentID { get; set; }
        public int Type { get; set; }

    }

    public class ReportingBossModel
    {

        public int? CompanyID { get; set; }
        public int EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Status { get; set; }
        public string IsBlock { get; set; }
    }

    public class EmpDetailsReportingModel
    {

        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string status { get; set; }
        public string Leave { get; set; }
        public string Intime { get; set; }
        public string PunchTime { get; set; }

    }



}
