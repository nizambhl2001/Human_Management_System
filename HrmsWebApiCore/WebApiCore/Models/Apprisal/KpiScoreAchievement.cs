using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Apprisal
{
    public class KpiScoreAchievement
    {
        public int? ID { get; set; }
        public int EmpKpiID { get; set; }
        public string Achievement { get; set; }
        public decimal Score { get; set; }
        public string Comment { get; set; }
        public string ManComment { get; set; }
        public string EmpComment { get; set; }
        public int YearID { get; set; }
        public int QuarterID { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public string EmpCode { get; set; }
        public int IsFinal { get; set; }
        public decimal AchievementPerchent { get; set; }
        public int? NoOfIncrement { get; set; }
        public int? IsPromotion { get; set; }
        public string TIT { get; set; }

       
        public string PromotionType { get; set; }
        public decimal AvgScore { get; set; }
        public string QName { get; set; }
        public decimal PresentScore { get; set; }
        public decimal? GrossSalary { get; set; }
        public string RecoComments { get; set; }
        public string NoofIncreament { get; set; }
        public int? IsApprove { get; set; }
    }
}
