using System;
using System.Data;
using System.Data.SqlClient;
using Dapper.Framework;
using WebApiCore.Models.HR;

namespace WebApiCore.DbContext.HR
{
    public class EmpBlockInfo
    {
        public static bool EmpBlockInfoSave(EmpBlockInfoModel empBlock)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                empBlock.ID,
                empBlock.EmpCode,
                empBlock.IsBlock,
                empBlock.BlockDate,
                empBlock.Remark,
                empBlock.CompanyID,
                empBlock.Status
            };
            int rowAffect = conn.Execute("INSertBlockInfo",param:param,commandType:CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        public static EmpBlockInfoModel GetById(string empCode, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<EmpBlockInfoModel>("SELECT TOP 1 * FROM EmpBlock WHERE EmpCode='" + empCode + "' And CompanyID=" + companyId+ "ORDER BY ID DESC");
            return data;
        } 
        public static EmpBlockInfoModel EmpBlock_ById(string empCode, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                empCode = empCode,
                companyId = companyId
            };
            var data = conn.QuerySingle<EmpBlockInfoModel>("EmpBlock_ni", param, commandType: CommandType.StoredProcedure);
            return data;
        }
        }
    }
