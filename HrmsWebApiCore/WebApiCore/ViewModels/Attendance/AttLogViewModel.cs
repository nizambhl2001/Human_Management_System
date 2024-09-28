using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Attendance
{
    public class AttLogViewModel
    {
        public string EmpCod { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Location { get; set; }
        public DateTime AttnDate { get; set; }
        public string Login { get; set; }
        public string Logout { get; set; }
        public int CompanyID { get; set; }

    }
}
