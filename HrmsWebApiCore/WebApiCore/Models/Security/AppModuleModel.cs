using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class AppModuleModel
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public string ModuleRoutePath { get; set; }
        public List<AppPageModel> Pages { get; set; }
    }
}
