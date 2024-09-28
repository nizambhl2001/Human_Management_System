using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.ViewModels.Attendance
{
    public class ShiftDayInfoViewModel:HolydayModel
    {
        public string ShfitName { get; set; }
        public string NextDate { get; set; }
        public string WeekDays { get; set; }
        public string weekDay { get; set; }
    }
}
