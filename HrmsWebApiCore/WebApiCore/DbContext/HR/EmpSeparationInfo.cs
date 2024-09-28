using Dapper.Framework;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class EmpSeparationInfo
    {
        public static bool InsertSeparation(EmpSeparationInfoModel separation)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                separation.EmpCode,
                separation.ResignType,
                separation.Date,
                separation.IsCanBack,
                separation.Reason,
                separation.CompanyID
            };
            var rowAffect = conn.Execute("INSertRegisnationInfo",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<EmpSeparationInfoModel> getAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var sql = (@"SELECT     dbo.RegisnationInfo.id, dbo.RegisnationInfo.EmpCode, dbo.RegisnationInfo.ResignType, dbo.RegisnationInfo.Type, dbo.RegisnationInfo.Status, 
                         dbo.RegisnationInfo.Date, dbo.RegisnationInfo.IsCanBack, dbo.RegisnationInfo.Reason, dbo.RegisnationInfo.CompanyID
                         FROM         dbo.RegisnationInfo INNER JOIN
                          dbo.EmpGeneralInfo ON dbo.RegisnationInfo.EmpCode = dbo.EmpGeneralInfo.EmpCode AND dbo.RegisnationInfo.CompanyID = dbo.EmpGeneralInfo.CompanyID   WHERE RegisnationInfo.Status = 1");
            
            var dataList = conn.Query<EmpSeparationInfoModel>(sql).ToList();
            return dataList;
        }
        public static EmpSeparationInfoModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var sql = ("SELECT * FROM RegisnationInfo WHERE ID=" + id);
            var data = conn.QuerySingle<EmpSeparationInfoModel>(sql);
            return data;
        }
        public static bool Delete(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var sql = ("DELETE RegisnationInfo WHERE ID="+id);
            var rowAffect = conn.Execute(sql);
            return rowAffect > 0;
        }
    }
}
