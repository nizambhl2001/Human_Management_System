using System;

namespace WebApiCore.Models.HR.Employee
{
    public class EmpAwardModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string AwardTitle { get; set; }
        public string Institute { get; set; }
        public string Location { get; set; }
        public int? CountryID { get; set; }
        public DateTime? AwardDate { get; set; }
        public string Description { get; set; }
        public int CompanyID { get; set; }
        public string Msg { get; set; }
    }
}









