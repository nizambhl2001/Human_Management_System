using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    public class BonusType
    {
        public static List<BonusTypeModel> getBonus()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var Dataset = conn.Query<BonusTypeModel>("SELECT * FROM OtherPaymentType").ToList();
            return Dataset;
        }
        public static bool SaveBonusType(BonusTypeModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var sql = "INSERT INTO OtherPaymentType (PaymentType,Persent,SalaryID) VALUES('" + bonus.PaymentType + "'," + bonus.Persent + "," + bonus.SalaryID + ")";
            var rowAffect = conn.Execute(sql);
            return rowAffect > 0;
        }

    }

}
