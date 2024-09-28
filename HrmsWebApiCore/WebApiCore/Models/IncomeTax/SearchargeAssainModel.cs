using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class SearchargeAssainModel
    {
        public int ID { get; set; }
        public string EmpCode  { get; set; }
        public int TaxYearID { get; set; }
        public int PersentID { get; set; }
        public DateTime SDate  { get; set; }
        public int CompanyID { get; set; }
    }
}
