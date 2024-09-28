using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.DbContext.SalarySetup;

namespace WebApiCore.Models.SalarySetup
{
    public class PayscaleSetup
    {
        public int ID { get; set; }
        public int GradeValue { get; set; }
        public string GradeName { get; set; }
        public int GradeSerial { get; set; }
        public List<DetailsPayscaleSetupModel> Details { get; set; }
        public string PayscaleYear { get; set; }
        public int TAG { get; set; }
        public int CompanyID { get; set; }
        public string Msg { get; set; }
    }
}
