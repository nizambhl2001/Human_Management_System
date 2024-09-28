using HRMS.Models.Addition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.Addition;

namespace WebApiCore.Models.Addition
{
    public class ProcessImportAdditionModel
    {
        public int ID { get; set; }
        public int EmpID { get; set; }
        public List<ProcessInportVM> SelectedDriver { get; set; }
        public int StructureID { get; set; }
        public int SalaryHeadID { get; set; }
        public int SalaryHeadType { get; set; }
        public int YearID { get; set; }
        public int TaxYearID { get; set; }
        public int SalaryTypeID { get; set; }
        public int BasedOnID { get; set; }
        public string CreatedDate { get; set; }
        public int PeriodID { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
        public string PeriodName { get; set; }
        public int UserTypeID { get; set; }
        public int Grade { get; set; }
    }
}

