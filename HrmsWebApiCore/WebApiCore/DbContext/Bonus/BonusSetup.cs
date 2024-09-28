using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    public class BonusSetup
    {

        public static bool Save(BonusSetupModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                bonus.ID,
                bonus.JobType,
                bonus.PaymentTypeID,
                bonus.EmployeeTepe,
                bonus.SalaryHead,
                bonus.Number,
                bonus.BDate,
                bonus.Note,
                bonus.CompanyID
            };
            var rowAffect = conn.Execute("INSertBonusSetup", param: param, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<BonusHead> getAllBonusHead()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BonusHead>("SELECT * From SalaryHead").ToList();
            return data;

        }
        public static List<BonusSetupViewModel> GetAll(int GradeValue, int CompanyID)
        {
            var param = new
            {
                GradeValue,
                CompanyID
            };
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<BonusSetupViewModel>("sp_Bonussetup_List",param:param,commandType:CommandType.StoredProcedure).ToList();
            return dataset;
        }
    }
}
