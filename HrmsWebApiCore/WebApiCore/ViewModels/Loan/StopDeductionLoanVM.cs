using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Loan;

namespace WebApiCore.ViewModels.Loan
{
    public class StopDeductionLoanVM:StopDeductionModel
    {

        public string empName { get; set; }
        public string designation { get; set; }
        public string joinDate { get; set; }
        public int grade { get; set; }
        
        public string AccountName { get; set; }

    }
}
