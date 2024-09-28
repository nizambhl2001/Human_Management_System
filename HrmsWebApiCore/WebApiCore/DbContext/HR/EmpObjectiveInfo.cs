using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class EmpObjectiveInfo
    {
        public static bool insertUpdateDelete(EmpObjectiveInfoModel objective)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                objective.ID,
                objective.EmpCode,
                objective.Description,
                objective.YearID,
                objective.UserID,
                objective.CompanyID,
                objective.Msg,
                objective.pOptions
            };
            var rowAffect = conn.Execute("sp_EmpObjective",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<EmpObjectiveInfoModel> getAllObjective()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var datalist = conn.Query<EmpObjectiveInfoModel>("SELECT * FROM EmpObjective").ToList();
            return datalist;
        }
       
        public static EmpObjectiveInfoModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var sql = ("SELECT * FROM EmpObjective WHERE ID=" + id);
            var data = conn.QuerySingle<EmpObjectiveInfoModel>(sql);
            return data;
        }
    }
}
