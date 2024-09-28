using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class UploadDocumentModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }
        public string type { get; set; }
        public int DocumentType { get; set; }
        public byte[] data { get; set; }
        public DateTime Date { get; set; }
        public int CompanyID { get; set; }
        public int pOptions { get; set; }
        public string DocumentTypeName { get; set; }
    }
}
