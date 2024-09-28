using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Tour
{
    public class TourModel
    {
        public int? ID { get; set; }
        public string EmpCode { get; set; }
        public DateTime LSDate { get; set; }
        public DateTime LEDate { get; set; }
        public DateTime LADate { get; set; }
        public int? AccepteDuration { get; set; }
        public int? UnAccepteDuration { get; set; }
        public string ReferanceEmpcode { get; set; }
        public string AppType { get; set; }
        public string YYYYMMDD { get; set; }
        public int CompanyID { get; set; }
        public string ApplyTo { get; set; }
        public string Reason { get; set; }
        public string EmgContructNo { get; set; }
        public string EmgAddress { get; set; }
    }
}
