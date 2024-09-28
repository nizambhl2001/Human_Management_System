using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class YTDEntity
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public int KpiID { get; set; }
        public string KPIName { get; set; }
        public string Target { get; set; }
        public string Achievement { get; set; }
        public decimal AvgWeight { get; set; }
        public decimal WeightYearly { get; set; }
        public decimal AchvPercentage { get; set; }
        public decimal Score { get; set; }
        public int IsAgree { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public int KpiType { get; set; }
        public int YearID { get; set; }
        public string EmpName { get; set; }
        public string Employee { get; set; }
        public string Boss { get; set; }
        public string YTDStatus { get; set; }
        public int IsBossAgree { get; set; }
        public int IsFinal { get; set; }
        public string EmpComment { get; set; }
        public string BossComment { get; set; }
    }
}
