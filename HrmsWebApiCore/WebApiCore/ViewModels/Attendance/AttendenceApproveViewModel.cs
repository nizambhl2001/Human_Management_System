using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Attendance;

namespace WebApiCore.ViewModels.Attendence
{
    public class AttendenceApproveViewModel: AttendenceApplicationModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string ReqFrom { get; set; }
        public string ForwordTo { get; set; }
      
        
    }
}
