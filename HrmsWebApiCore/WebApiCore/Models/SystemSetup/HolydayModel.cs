using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.SystemSetup
{
    public class HolydayModel
    {
        public int id { get; set; }
        public string HYear { get; set; }
        public string Hdate { get; set; }
        public string Note { get; set; }
        public List<HolydayModel> CalenderArray { get; set; }
    }
}
