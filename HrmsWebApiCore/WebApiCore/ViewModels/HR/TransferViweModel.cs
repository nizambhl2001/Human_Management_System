using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.HR
{
    public class TransferViweModel
    {
        public string EmpCode { get; set; }
        public int TPType { get; set; }
        public int CompanyID { get; set; }
        public string EmpName { get; set; }
        public string PreDepartMent { get; set; }
        public string PreDesignation { get; set; }
        public string PasDepartment { get; set; }
        public string PasDesignation { get; set; }
        public string PreProject { get; set; }
        public string PasProject { get; set; }
        public string PreGrade { get; set; }
        public string PasPreGrade { get; set; }
        public string TransferDate { get; set; }
        public string TPTypeDes { get; set; }
        public string Note { get; set; }
        public string PreLocation { get; set; }
        public string PasLocation { get; set; }
        public int ID { get; set; }
        public string Description { get; set; }
     
    }
}
