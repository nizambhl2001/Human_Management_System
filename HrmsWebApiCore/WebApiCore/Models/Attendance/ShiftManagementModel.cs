using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Attendance
{
    public class ShiftManagementModel
    {
        public int ShiftID { get; set; }
        public string EmpCode { get; set; }
        public DateTime ShiftDate { get; set; }
        public string Note { get; set; }
        public string DDMMYYYY { get; set; }
        public string NextDate { get; set; }
        public int? ShiftIDRostaring { get; set; }
        public int CompanyID { get; set; }

    }
}
