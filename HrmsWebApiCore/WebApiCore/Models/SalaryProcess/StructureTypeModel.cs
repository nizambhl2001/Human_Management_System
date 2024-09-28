using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SalaryProcess
{
    public class StructureTypeModel
    {
        public int ID { get; set; }
        public string StructureName { get; set; }
        public int SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}
