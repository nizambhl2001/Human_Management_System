using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.GL_Integration;

namespace WebApiCore.ViewModels.NewFolder
{
    public class GLCodeVM :GLCodeModel
    {
        public string Branch { get; set; }
        public string DepartmentGL { get; set; }
        public string CostHead { get; set; }
    }
}
