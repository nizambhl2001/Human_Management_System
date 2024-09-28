using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Loan;

namespace WebApiCore.DbContext.Loan
{
    public class CashReceivedDB
    {

        public static List<CashReceivedModel> GetCashReceivedInfo(string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.Query<CashReceivedModel>("SELECT * FROM EmpLoanAdvanceCashPayment WHERE EmpCode='" + empCode + "'").ToList();
            return dateset;
        }

        public static CashReceivedModel GetCashReceivedbyID(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.QuerySingle<CashReceivedModel>("SELECT * FROM EmpLoanAdvanceCashPayment WHERE id=" + id);
            return dateset;
        }

        public static bool SaveCashReceivedInfo(CashReceivedModel cashreceived)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paraObj = new
                {
                    cashreceived.id,
                    cashreceived.EmpCode,
                    cashreceived.PaymentDate,
                    cashreceived.SalaryHeadID,
                    cashreceived.PrincipleAmount,
                    cashreceived.Interest,
                    cashreceived.NetPayment,
                    cashreceived.Remarks,
                    cashreceived.UserID,
                    cashreceived.CompanyID
                };
                int rowAffect = con.Execute("INSertLoanCashPayment", param: paraObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
    }
}
