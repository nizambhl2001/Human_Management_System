using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class KPISetupEmployeeWise
    {
        public int ID { get; set; }
        public int KpiID { get; set; }
        public int KPIType { get; set; }
        public string KPIName { get; set; }
        public string Target { get; set; }
        public decimal Weight { get; set; }
        public string EmpCode { get; set; }
        public string Department { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public int IsAgree { get; set; }
        public int YearID { get; set; }
        public int QuarterId { get; set; }
        public string ReportTo { get; set; }
        public int IsBossAgree { get; set; }
    }
}
