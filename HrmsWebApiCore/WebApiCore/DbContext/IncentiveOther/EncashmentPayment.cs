using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.IncentiveOther
{
    public class EncashmentPayment
    {
        public static List<SubtitutionLeaveAmountViewModel> ShowData(SubtitutionLeaveAmountViewModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                model.BranchID,
                model.DepartmentID,
                model.YearID,
                PeriodID = model.SalaryPeriodID,
                model.GradeValue,
                model.CompanyID
            };
            var dataset = conn.Query<SubtitutionLeaveAmountViewModel>("sp_GetLeaveEncashmentAmount", param: peram, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }
    }
}
