using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class SalaryView
    {
        public static List<SalaryViewModel> getSalaryView(string empcode,int grade,int comid,int salarytype)
        {
            var conn = new SqlConnection(Connection.ConnectionString());

            var obj = new
            {
                EmpCode = empcode,
                Grade = grade,
                CompanyID = comid
            };

            if (salarytype == 1) {
               
                List<SalaryViewModel> result = conn.Query<SalaryViewModel>("SP_ShowTotalSalary_Payscale", param: obj, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
            else
            {
                List<SalaryViewModel> result = conn.Query<SalaryViewModel>("SP_ShowTotalSalary_Grosstotal", param: obj, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
            
        }
    }
}
