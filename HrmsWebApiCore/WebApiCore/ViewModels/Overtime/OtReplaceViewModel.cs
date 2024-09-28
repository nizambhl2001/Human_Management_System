using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Overtime
{
    public class OtReplaceViewModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public DateTime OtDate { get; set; }
        public double OtHours { get; set; }
        public DateTime? ReplacedDate { get; set; }
        public double ReplacedHours { get; set; }
        public double OtBalance { get; set; }
        public int CompanyID { get; set; }
    }
}
