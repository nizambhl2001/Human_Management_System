using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class EmpSeparationInfoModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string ResignType { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string IsCanBack { get; set; }
        public string Reason { get; set; }
        public int CompanyID { get; set; }
    }
}
