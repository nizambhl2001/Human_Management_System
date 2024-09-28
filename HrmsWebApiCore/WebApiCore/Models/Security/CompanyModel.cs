using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class CompanyModel
    {
        public int? ID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string Phone { get; set; }
        public string Code { get; set; }
        public string TIN { get; set; }
        public string Email { get; set; }
        public string WebAddress { get; set; }
        public int SalaryType { get; set; }
        public byte[] CompanyLogo { get; set; }
        public byte[] ReportLogo { get; set; }
        public int? pOptions { get; set; }
    }
}
