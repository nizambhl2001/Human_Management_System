using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class KPISetupEntity
    {
        public int ID { get; set; }
        public string KPIName { get; set; }
        public int DepartmentId { get; set; }
        public string Department { get; set; }
        public int SerialNo { get; set; }
        public int KPIType { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public string Target { get; set; }
        public decimal? Weight { get; set; }
        public int? EmpId { get; set; }
        public int? IsAgree { get; set; }
        public int IsBossAgree { get; set; }
        public int? AchieveID { get; set; }
        public string Achievement { get; set; }
        public decimal? Score { get; set; }
        public string Comment { get; set; }
        public int? QuarterID { get; set; }
        public string ManComment { get; set; }
        public string EmpComment { get; set; }
        public int? IsFinal { get; set; }
        public decimal? AchievmentPercnt { get; set; }
        public int IsBossEdit { get; set; }
        public int Option { get; set; }
        public decimal? AchievementPerchent { get; set; }

        public int? NoOfIncrement { get; set; }
        public int? IsPromotion { get; set; }
        //isApproved

    }
}