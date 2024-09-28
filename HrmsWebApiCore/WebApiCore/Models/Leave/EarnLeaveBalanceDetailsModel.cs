using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Leave
{
    public class EarnLeaveBalanceDetailsModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public int Qty { get; set; }
        public string Note { get; set; }
        public string TypeName { get; set; }
        public int? LeaveTypeID { get; set; }
        public int? MaxDays { get; set; }
        public int? TOtalLeave { get; set; }
        public int? Avaieled { get; set; }
    }
}
