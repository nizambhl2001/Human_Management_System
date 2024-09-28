using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class LeavingReasonModel
    {
        public int? LeavingReasonID { get; set; }
        public string LeavingReason { get; set; }
        public double ReasonPerchentage { get; set; }
    }
}
