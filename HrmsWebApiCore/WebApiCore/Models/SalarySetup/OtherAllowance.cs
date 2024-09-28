using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalarySetup;

namespace WebApiCore.ViewModels.SalarySetup
{
    public class OtherAllowance
    {
        public int ID { get; set; }
        public int PayscaleID { get; set; }
        public string GradeName { get; set; }
        public int? CompanyID { get; set; }
        public string GradeValue { get; set; }
        public  decimal Amount { get; set; }
     

    }
}
