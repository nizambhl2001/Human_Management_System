using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels
{
    public class ProductionPositionViewModel: EmpProductionPositionModel
    {
        public int LineID { get; set; }
        public int FloorID { get; set; }
        public int UniteID { get; set; }
        public string ProductionLine { get; set; }
        public string ProductionUnite { get; set; }
    }
}
