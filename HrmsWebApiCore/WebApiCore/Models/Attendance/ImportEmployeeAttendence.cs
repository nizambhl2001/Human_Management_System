using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Attendance
{
    public class ImportEmployeeAttendence
    {
        public int ID {get;set;}
        public int  CompanyID {get;set;}
        public List<IFormFile> ExcelFiles {get;set;}
        public string EmpCode {get;set;}
        public int TerminalID {get;set;}
    }
}
