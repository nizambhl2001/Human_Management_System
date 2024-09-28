using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRMS.Models.Leave
{
    public class LeaveTypeModel
    {
        public int? ID { get; set; }
        public string TypeName { get; set; }
        public int MaxDays { get; set; }
        public int? Typeee { get; set; }
        public string Shortn { get; set; }
        public int GradeValue { get; set; }
        public int? SortOrder { get; set; }
        public int ApplyMax { get; set; }
        public int UserID { get; set; }
        public string Msg { get; set; }
        public int? pOptions { get; set; }
    }
}