using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.SalarySetup
{
    public class MonthModel
    {

        public int ID  {get;set;}
        public string MonthName { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}