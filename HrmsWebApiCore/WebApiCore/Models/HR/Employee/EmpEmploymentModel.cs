using System;

namespace WebApiCore.Models.HR.Employee
{
    public class EmpEmploymentModel
    {
        public int id { get; set; }
        public string EmpCode { get; set; }
        public int CompanyID { get; set; }
        public int BusinessNatureID { get; set; }
        public int DesignationID { get; set; }
        public DateTime JoinDate { get; set; }
        public string JobType { get; set; }
        public int EmpGradeID { get; set; }
        public string JobDescription { get; set; }
        public int JobLocation { get; set; }
        public int ProjectID { get; set; }
        public int DepartmentID { get; set; }
        public string ConfirmationDate { get; set; }
        public string ConfirmationDueDate { get; set; }
        public string CardNo { get; set; }
        public string Experience { get; set; }
        public string Resident { get; set; }
        public string IsComCar { get; set; }
        public string Status { get; set; }
        public int Location { get; set; }
        public string IsBlock { get; set; }
        public int Unit { get; set; }
        public int MachineID { get; set; }
        public string ReportTo { get; set; }
        public string OT { get; set; }
    }
}