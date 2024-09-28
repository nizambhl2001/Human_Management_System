using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.SystemSetup
{
    public class AssaignDepartmentGLViewModel
    {   
        public int ID { get; set; }
        public int GLID { get; set; }
        public string Depertment { get; set; }
        public string DepertmentGL { get; set; }
        public string GLCode { get; set; }
        public int CompanyID { get; set; }
    }
}
