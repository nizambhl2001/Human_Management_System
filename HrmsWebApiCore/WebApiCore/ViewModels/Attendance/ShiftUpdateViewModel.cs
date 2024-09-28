using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Attendance;

namespace WebApiCore.ViewModels.Attendance
{
    public class ShiftUpdateViewModel : ShiftManagementModel
    {
        public string Name { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; } 
    }
}
