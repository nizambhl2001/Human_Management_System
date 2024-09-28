using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Attendance
{
    public class ShiftUpdateModel
    {
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string Departrment { get; set; }
        public string Designation { get; set; }
        public int ShiftID { get; set; }
        public string ShiftDate { get; set; }
    }
}
