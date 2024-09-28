using HRMS.ViewModels.Addition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiCore.ViewModels.Deduction;

namespace HRMS.Models.Addition
{
    public class DriverAllowanceModel
    {
        public int ID { get; set; }
        public List<AllDeductionVM> SelectedDriver { get; set; }
        public int SalaryHeadID { get; set; }
        public int TaxYearID { get; set; }
        public int SalaryTypeID { get; set; }
        public int PeriodID { get; set; }
        public string PeriodName { get; set; }
        public int CompanyID { get; set; }
    }
}
