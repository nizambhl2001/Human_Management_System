using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.IncomeTax
{
    public class CPShowAllViewModel
    {
        public int PeriodID { get; set; }
        public int GradeValue { get; set; }
        public int Branch { get; set; }
        public int CompanyID { get; set; }
    }
}
