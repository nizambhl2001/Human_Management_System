using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Bonus
{
    public class BonusTypeModel
    {
        public int? ID { get; set; }
        public string PaymentType { get; set; }
        public int Persent { get; set; }
        public int SalaryID { get; set; }
    }
}
