using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.FinalSattlement
{
    public class NoticeDaySetupModel
    {
        public int ID { get; set; }
        public int? Grade { get; set; }
        public int? EmpDay { get; set; }
        public int? Day { get; set; }
        public DateTime? SDate { get; set; }
        public string Note { get; set; }
        public int CompanyID { get; set; }
        public string GradeName { get; set; }
     
    }
}
