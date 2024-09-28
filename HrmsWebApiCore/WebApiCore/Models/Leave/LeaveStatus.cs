using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Leave
{
    public class LeaveStatus
    {
        public int? Type { get; set; }
        public int? ID { get; set; }
        public int? CompanyID { get; set; }
        public string Remarks { get; set; }
        public string TypeName { get; set; }
        public int? AccepteDuration { get; set; }
        public string EmpName { get; set; }
        public string Status { get; set; }
    }
}
