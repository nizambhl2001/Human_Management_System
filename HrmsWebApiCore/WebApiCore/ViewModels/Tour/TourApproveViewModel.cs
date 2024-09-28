using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Tour;

namespace WebApiCore.ViewModels.Tour
{
    public class TourApproveViewModel: TourModel
    {
        public int? TourID { get; set; }
        public string ReqFrom { get; set; }
        public string ReqTo { get; set; }
        public int? UserID { get; set; }
        public string Remarks { get; set; }
        public int? COmpanyID { get; set; }
        public string Msg { get; set; }
        public int? pOptions { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public int? GradeValue { get; set; }
        public int? Grandtype { get; set; }
        public int? Status { get; set; }
    }
}
