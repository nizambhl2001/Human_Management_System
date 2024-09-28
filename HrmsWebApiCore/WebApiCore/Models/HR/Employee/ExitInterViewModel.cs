using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class ExitInterviewModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public List<LeavingReasonModel> LeavingReason { get;set;}
        public  string InterViewer { get; set; }
        public  string DateOfInterview { get; set; }
        public  double ReasonPerchentage { get; set; }
        public  int? OutOfPayroll { get; set; }
    }
}
