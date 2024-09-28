using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.Attendance
{
    public class ManualAttendenceModel
    {
        public int ID {get;set;}
        public int PerID {get;set;}
        public string EmpCod {get;set;}
        public string AttnDate {get;set;}
        public string AttnTime {get;set;}
        public int TYPEE {get;set;}
        public decimal  Hourr {get;set;}
        public decimal Minutee {get;set;}
        public decimal Secondd {get;set;}
        public string DDMMYYYY {get;set;}
        public string MachineName {get;set;}
        public int CompanyID {get;set;}
        public DateTime? punch_time { get;set;}
       
    }
}
