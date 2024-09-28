using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Security;

namespace WebApiCore.ViewModels.Security
{
    public class UserViewModel:UserModel
    {
        public string UserTypeName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string WebAddress { get; set; }
        public string GradeName { get; set; }
        public byte[] LoginDeviceId { get; set; }=null;
        public string Department { get; set; }
        public byte[] CompanyLogo { get; set; }
        public byte[] ReportLogo { get; set; }
        public byte[] Picture { get; set; }
        public List<object> AssignedPages { get; set; }

    }
}
