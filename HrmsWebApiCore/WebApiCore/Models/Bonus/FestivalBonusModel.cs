using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.Bonus;

namespace WebApiCore.Models.Bonus
{
    public class FestivalBonusModel: FestivalBonusViewModel
    {
        public int? Grade { get; set; }
        public int? GradeID { get; set; }
        public decimal? OTPP { get; set; }
        public string Date { get; set; }
        public int? CompanyID { get; set; }
        public int? JobType { get; set;}
        public List<FestivalBonusViewModel> BonusGrid { get; set; }
       
    }
}
