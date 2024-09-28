using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Models.ShiftAllowance;

namespace WebApiCore.ViewModels.ShiftAllowance
{
    public class ShiftAllowanceSetupVM:ShiftAmountSetupModel
    {
        public int Grade { get; set; }
        public string ShfitName { get; set; }
        public string GradeName { get; set; }

    }
}
