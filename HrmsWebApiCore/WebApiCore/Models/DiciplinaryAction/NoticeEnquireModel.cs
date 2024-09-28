using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.DiciplinaryAction
{
    public class NoticeEnquireModel
    {
    public int  ID {get;set;}
    public int NoticeID {get;set;}
    public string EmpCode  {get;set;}
    public DateTime DateOfEnquiry {get;set;}
    public DateTime DateOfNoticeIssue {get;set;}
    public List<EnquireCommittyModel> EnquireCommitty { get; set; }
    public string Venue { get; set; }
    public string EnqEmpCode { get; set; }
    public string Note { get; set; }
    public string EmpNote { get; set;}
    public int UserID {get;set;}
    public int CompanyID {get;set;}
    }
}