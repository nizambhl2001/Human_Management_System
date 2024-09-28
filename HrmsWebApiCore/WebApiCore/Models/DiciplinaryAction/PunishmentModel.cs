using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.DiciplinaryAction
{
    public class PunishmentModel
    {
        public int ID { get; set; }
        public string EmpCode  {get;set;}
        public DateTime DateOfLetterIssue  {get;set;}
        public int NatureOfPunishmentID { get; set; }
        public int ActionID { get; set; }
        public DateTime StartDate  {get;set;}
        public DateTime EndDate { get;set;}
        public int sDays { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
    }
}