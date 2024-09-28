using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.GL_Integration
{
    public class CostHeadModel
    {
        public int ID { get; set; }
        public string CostHead { get; set; }
        public int CompanyID { get; set; }
        public int? CreateUser { get; set; }
    }
}
