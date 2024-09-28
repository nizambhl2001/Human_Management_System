using HRMS.Models.Leave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Leave
{
    public class LeaveApplyViewModel:LeaveApplyModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string TypeName { get; set; }
    }
}
