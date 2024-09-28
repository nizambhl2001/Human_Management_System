using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.Diciplinary_Action
{
    public class ShowCase
    {
        public int ID   {get;set;}
        public int EmpCode {get;set;}
        public int Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime ShowcaseDate { get; set; }
        public int Action { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
        public string Remarks {get;set;}
    }
}