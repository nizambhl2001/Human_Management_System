using HRMS.Models.Leave;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Leave
{
    public class EarnLeaveBalanceViewModel:EarnLeaveBalanceModel
    {
        public string EmpCode { get; set; }
        public string Qty { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string JobLocation { get; set; }
        public int Grade { get; set; }
        
        public int ExecuteType { get; set; } //SP: Type=1 for encashment and other for carry forward
    }
}
