using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class EmpEmploymentInfoEntity
    {
        public int ID { get; set; }
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
        public int Unit { get; set; }
        public string IsBlock { get; set; }
        public string ReportTo { get; set; }
        public string OT { get; set; }
        public int MeetingNo { get; set; }

        public string OldCode { get; set; }
        public string OldCodeAtten { get; set; }
        public int OfficeSchool { get; set; }
        public int Subsection { get; set; }
        public int EmpCategory { get; set; }
        // Addtional Entites Due To Fellow Programming Logic.
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string BusinessNature { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLocation { get; set; }
        public string ProjectName { get; set; }
        public string BranchName { get; set; }
        public string CompanyAddress { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string DesignationName { get; set; }
        //

        public string ReportName { get; set; }
        //
        public string Employee { get; set; }
        public string Boss { get; set; }
        public int IsBossEdit { get; set; }
        public string Apprisal { get; set; }
        public int? IsApprove { get; set; }
        public DateTime TransferDate { get; set; }
        public string PayScale { get; set; }


        public int NoofIncreament { get; set; }
        public string PromotionType { get; set; }
        public string RecoComments { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal PresentScore { get; set; }
        public decimal AvgScore { get; set; }
        public string QName { get; set; }
        public string ManComment { get; set; }
    }
}
