using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.ViewModels.Bonus
{
    public class BonusSetupViewModel:BonusSetupModel
    {
      
        public string GradeName { get; set; }
        public string Accountname { get; set; }
        public string PaymentType { get; set; }
    }
}
