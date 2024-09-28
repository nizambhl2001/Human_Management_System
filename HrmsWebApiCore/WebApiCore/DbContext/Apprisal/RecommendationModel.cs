using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.DbContext.Apprisal
{
    public class RecommendationModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public int YearId { get; set; }
        public int NoofIncreament { get; set; }
        public string PromotionType { get; set; }
        public string RecoComments { get; set; }
        public int CompanyId { get; set; }
        public int UserId { get; set; }
        public int IsApprove { get; set; }
    }
}
