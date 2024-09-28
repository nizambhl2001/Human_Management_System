using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.SalarySetup
{
    public class PayscaleModel
    {
        public int ID { get; set; }
        public string PayScale { get; set; }
        public string SalaryGradeID { get; set; }
        public int CompanyID { get; set; }
        public string Msg { get; set; }
    }
}