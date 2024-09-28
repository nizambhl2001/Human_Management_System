using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.GL_Integration
{
    public class GLSalaryHeadAssignModel
    {
        public int ID { get; set; }
        public int CostHead { get; set; }
        public int? SalaryHead { get; set; }
        public DateTime? Date { get; set; }
        public string Note { get; set; }
        public int? UserID { get; set; }
        public int CompanyID { get; set; }
        public string AccountName { get; set; }
        public string CostHeadName { get; set; }

    }
}
