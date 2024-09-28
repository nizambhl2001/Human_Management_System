using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.Models.SalaryProcess
{
    public class SalaryStructureModel
    {
        public  int ID { get; set; }
        public int StructureID { get; set; }
        public int SalaryHeadID { get; set; }
        public int SalaryHeadType{ get; set; }
        public decimal Amount{ get; set; }
        public int SalaryTypeID { get; set; }
        public int BasedOnID { get; set; }
        public string CreatedDate{ get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
        public List<SalaryStructureViewModel> AdditionModel { get; set; }
        public List<SalaryStructureViewModel> DeductionModel { get; set; }
    }
}
