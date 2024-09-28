using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.GL_Integration
{
    public class GLCodeModel
    {
        public int ID { get; set; }
        public int? CostID { get; set; }
        public int? DepertmentID { get; set; }
        public int? BranchID { get; set; }
        public string GLCode { get; set; }
        public string GlDescription { get; set; }
        public int? UserID { get; set; }
        public int CompanyID { get; set; }
    }
}
