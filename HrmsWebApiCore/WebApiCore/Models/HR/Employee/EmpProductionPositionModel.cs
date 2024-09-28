using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class EmpProductionPositionModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public int MachineID { get; set; }
        public DateTime PositionDate { get; set; }
        public int UserID { get; set; }
        public string Note { get; set; }
        public int CompanyID { get; set; }
    }
}
