using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Attendance
{
    public class AssignedShiftInfoViewModel
    {
        public string EmpCode { get; set; }
        public DateTime ShiftDate { get; set; }
        public int ShiftID { get; set; }
        public int ShiftStartHour { get; set; }
        public int ShiftStartMin { get; set; }
        public int ShiftEndHour { get; set; }
        public int ShiftEndMin { get; set; }
    }
    public class deleteShitModal
    {
        public string CompId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ShiftId { get; set; }
    }

    public class shiftDelete
    {
        public deleteShitModal Models { get; set; }
        public List<string> Emcodes { get; set; }
    }
}
