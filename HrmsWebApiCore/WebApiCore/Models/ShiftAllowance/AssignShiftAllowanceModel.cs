using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.ShiftAllowance
{
    public class AssignShiftAllowanceModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public List<string> SelectedEmp { get; set; }
        public int ActiveType { get; set; }
        public int? CreateUser { get; set; }
        public DateTime? SystemDate { get; set; }
        public int CompanyID { get; set; }
    }
}