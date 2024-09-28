using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class ResignationLetterModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string EmpDesignation { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string Lettre { get; set; }
        public int Type { get; set; }
        public string LDate { get; set; }
        public int? CompanyID { get; set; }
        public string Reason { get; set; }
        public int? ApproveType { get; set; }
        public string ReqFrom { get; set; }
        public string EmpNameFrom { get; set; }
        public string EmpDesignationFrom { get; set; }
        public int ResignID { get; set; }
        public string ReqTo { get; set; }
        public string Remarks { get; set; }
        public string Msg { get; set; }
        public int GradeValue { get; set; }
    }
}
