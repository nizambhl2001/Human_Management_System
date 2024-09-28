using HRMS.Models.DiciplinaryAction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiCore.Models.SalaryProcess;

namespace HRMS.ViewModels.DisciplinaryAction
{
    public class NoticeEnquireViewModel:NoticeEnquireModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
    }
}