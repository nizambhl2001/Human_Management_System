using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class AppPageModel
    {
        public int? ID { get; set; }
        public int ModuleID { get; set; }
        public string ModuleName { get; set; }
        public string Name { get; set; }
        public string PageRoutePath { get; set; }
    }
}
