using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels;

namespace WebApiCore.Models.Attendance
{
    public class AttendenceSummeryModel
    {
          public int ID { get; set; }
          public string EmpCode {get;set;}
          public int? PeriodID {get;set;}
          public DateTime StartDate {get;set;}
          public DateTime EndDate {get;set;}
          public int CompanyID {get;set;}
          public int UserID {get;set;}
          public int Grade { get; set; }
          public int? Depertment { get; set; }
          public int? Branch { get; set; }
          public int? Project { get; set; }
          public List<AttendenceSummaryViewModel> AttendenceSummaryView { get; set; } 
    }
}
