using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Leave;

namespace WebApiCore.ViewModels.Leave
{
    public class LeaveDetailsViewModel:LeaveDetailsModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
