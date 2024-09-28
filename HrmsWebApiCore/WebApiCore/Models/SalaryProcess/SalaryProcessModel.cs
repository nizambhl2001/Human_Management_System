using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryProcessModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public int? StructureID { get; set; }
        public int? PeriodID { get; set; }
        public int UserTypeID { get; set; }
        public int Grade { get; set; }
        public int CompanyID { get; set; }
        public string PeriodName { get; set; }
        public int TaxYearID { get; set; }
        public int YearID { get; set; }
        public int SalaryTypeID { get; set; }
        public string Block { get; set; }
        public string EmpName { get; set; }
        public string EmailID { get; set; }
    }
}
