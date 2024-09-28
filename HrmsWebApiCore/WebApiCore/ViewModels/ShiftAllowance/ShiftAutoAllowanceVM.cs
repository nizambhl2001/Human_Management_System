using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.ShiftAllowance;

namespace WebApiCore.ViewModels.ShiftAllowance
{
    public class ShiftAutoAllowanceVM:ShiftAllowanceAutoModel
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string OfficeBranch { get; set; }

    }
}
