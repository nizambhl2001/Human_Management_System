using System;

namespace WebApiCore.Models.HR
{
    public class CasualJoiningDateModel
    {
        public int? ID { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string EmpCode { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime CasualJoining { get; set; }
        public DateTime Date { get; set; }
        public int CompanyID { get; set; }
    }
}