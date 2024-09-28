using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.ViewModels.Leave
{
    public class LeaveStatusVM
    {
        public string TypeName { get; set; }
        public int MaxDays { get; set; }
        public int TOtalLeave { get; set; }
        public int Typeee { get; set; }
        public int AccepteDuration { get; set; }
        public string EmpCode { get; set; }
        public int Balance { get; set; }
    }
}