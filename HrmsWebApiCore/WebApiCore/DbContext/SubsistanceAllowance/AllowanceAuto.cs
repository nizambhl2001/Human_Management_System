using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SubsistanceAllowances;

namespace WebApiCore.DbContext.SubsistanceAllowance
{
    public class AllowanceAuto
    {
        public static bool save(AllowanceAutoModel auto)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                auto.EmpCode,
                auto.Amount,
                auto.SubAmount,
                auto.Action,
                auto.Description,
                auto.SalaryHead,
                auto.PaydDays,
                auto.DayofMonths,
                auto.SalaryPeriodID,
                auto.PaidPeriodID,
                auto.PaymentDate,
                auto.PaymentType,
                auto.UserID,
                auto.CompanyID
            };
            var rowAffect = conn.Execute("sp_Insert_SubsistenceAllowance",param:param,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
    }
}
