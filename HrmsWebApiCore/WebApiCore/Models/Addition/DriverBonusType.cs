using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.Addition
{
    public class DriverBonusType
    {
        public int ID { get; set; }
        public string PaymentType { get; set; }
        public decimal Persent { get; set; }
        public int SalaryID { get; set; }
    }
}