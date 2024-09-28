using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Leave
{
    public class LeaveInfoStatusModel
    {
        public int ID { get; set; }
        public int LeaveID { get; set; }
        public string ReqFrom { get; set; }
        public string ReqTo { get; set; }
        public DateTime StatusDate { get; set; }
        public int Status { get; set; }
        public int COmpanyID { get; set; }
        public string Remarks { get; set; }
        public int Type { get; set; }
    }
}
