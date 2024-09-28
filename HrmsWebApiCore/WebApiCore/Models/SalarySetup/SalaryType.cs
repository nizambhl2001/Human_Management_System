using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.SalarySetup
{
    public class SalaryType
    {
        public int ID { get; set; }
        public string SalaryTypeName { get; set; }
        public string CreatedDate { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}