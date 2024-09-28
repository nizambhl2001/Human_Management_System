using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.ViewModels.Security
{
    public class UserLogHistory
    {
        public string UserName { get; set; }
        public string LoginTime { get; set; }
        public string LogoutTime { get; set; }
    }
}
