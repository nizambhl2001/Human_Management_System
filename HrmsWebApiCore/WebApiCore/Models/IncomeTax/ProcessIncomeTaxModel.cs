using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.IncomeTax
{
    public class ProcessIncomeTaxModel
    {
        public int ID { get; set; }
        public string EmpName { get; set; }
        public string EmpCode { get; set; }
    }
}
