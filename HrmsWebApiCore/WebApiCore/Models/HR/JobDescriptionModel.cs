using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR
{
    public class JobDescriptionModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string Description { get; set; }
        public int CompanyID { get; set; }
        public string Msg { get; set; }
        public int pOptions { get; set; }
        public int Status { get; set; }
        public DateTime? JobAssignDate { get; set; }
    }
}
