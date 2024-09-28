using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class AppPageAssignModel
    {
        public int? ID { get; set; }
        public int? UserID { get; set; }
        public int? UserTypeID { get; set; }
        public int CompanyID { get; set; }
        public List<AppModuleModel> Modules {get;set;}
    }
}
