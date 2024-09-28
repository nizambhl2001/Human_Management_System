using HRMS.Models.DiciplinaryAction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.ViewModels.DisciplinaryAction
{
    public class ShowCauseResultViewModel:ShowCauseResultModel
    {
        public string ShowCauseResult { get; set; }
        public string ShowCauseType { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int GradeValue { get; set; }

    }

   
}