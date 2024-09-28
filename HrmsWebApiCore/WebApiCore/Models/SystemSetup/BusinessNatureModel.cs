using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SystemSetup
{
    public class BusinessNatureModel
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public int IsActive { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}
