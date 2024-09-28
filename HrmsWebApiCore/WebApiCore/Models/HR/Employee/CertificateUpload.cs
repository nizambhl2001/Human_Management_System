using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class CertificateUpload
    {   public int? ID { get; set; }
        public string EmpCode { get; set; }
        public string Description { get; set; }
        public int EducationLevelID { get; set; }
        public byte[] CImage { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
        public string FileExtension { get; set; }
    }
}
