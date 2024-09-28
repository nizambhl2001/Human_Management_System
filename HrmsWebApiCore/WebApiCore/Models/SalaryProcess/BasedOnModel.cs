using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class BasedOnModel
    {
        public int ID { get; set; }
        public string BasedOnName { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}
