using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalarySetup;

namespace WebApiCore.Models.SalarySetup
{
    public class OtherAllowanceModel
    {

        public int ID { get; set; }
        public List<OtherAllowance> PayscaleDeails { get; set; }
        public int SalaryHeadID { get; set; }
        public int? SortOrder { get; set; }
        public int CompanyID { get; set; }
  



    }
}
