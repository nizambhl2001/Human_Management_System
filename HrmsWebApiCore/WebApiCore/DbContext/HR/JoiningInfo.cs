using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class JoiningInfo
    {
        public static bool Save(JoiningInfoModel jim)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                jim.EmpCode,
                jim.Department,
                jim.Designation,
                jim.Grade,
                jim.JoiningDate,
                jim.Salary
            };
            var rowAffect = conn.Execute("usp_JoiningInfo_Save", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static JoiningInfoModel getByEmpCode(string EmpCode)
        {
            var peram = new
            {
                EmpCode
            };
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<JoiningInfoModel>("usp_JoiningInfo_Get",param:peram, commandType: System.Data.CommandType.StoredProcedure);
            return dataset;
        }
    }

}
