using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncentiveOther;

namespace WebApiCore.DbContext.IncentiveOther
{
    public class EncashmentAmount
    {
        public static bool Save(EncashmentAmountModel amount)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
                var param = new
                {
                    amount.ID,
                    amount.EmpGrade,
                    amount.SalaryHead,
                    amount.Numberoftimes,
                    amount.Note,
                    amount.EDate,
                    amount.CompanyID,
                    amount.UserID
                };
            var rowAffect = conn.Execute("INSertEncashAmountSetup", param: param, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<EncashmentAmountModel> getAll(int CompanyID, int GradeValue)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                CompanyID,
                GradeValue
            };
            var data = conn.Query<EncashmentAmountModel>("sp_LeaveEncashAmountsetup_List", param: param, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return data;
        }
        public static EncashmentAmountModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var leave = conn.QuerySingle<EncashmentAmountModel>("SELECT * FROM EncashmentAmountSetup WHERE ID=" + id);
            return leave;
        }
    }
}
