using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.OverTime
{
    public class OtRequisitionModel
    {
        public int? ID { get; set; }
        public int UserID { get; set; }
        public DateTime RequisitionDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int SectionID { get; set; }
        public string Section { get; set; }
        public string ReasonOfOt { get; set; }
        public bool IsApprove { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string ApprovedBy { get; set; }
        public bool IsEditByBoss { get; set; }
        public int CompanyID { get; set; }
        public List<OtRequisitionDetailsModel> OtRequisitionDetails { get; set; }
    }
}
