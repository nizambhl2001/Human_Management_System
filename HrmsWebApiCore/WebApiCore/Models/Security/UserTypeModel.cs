using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Security
{
    public class UserTypeModel
    {
        public int? ID { get; set; }
        public string UserTypeName { get; set; }
        public int? SortOrder { get; set; }
        public int CompanyID { get; set; }
    }
}
