using System;

namespace WebApiCore.Models.HR.Employee
{
    public class EmpAdditionalDutyModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public int PayType { get; set; }
        public int Department { get; set; }
        public int Designation { get; set; }
        public int SchoolorOffice { get; set; }
        public string Responsibilities { get; set; }
        public string NoticeIssuedDate { get; set; }
        public string EffFromDate { get; set; }
        public string EffToDate { get; set; }
        public string Duration { get; set; }
        public decimal Amount { get; set; }
        public string Remark { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public string Msg { get; set; }
        public int? pOptions { get; set; }
    }
}