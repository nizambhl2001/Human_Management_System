using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    public class ImportBonus
    {
        public static bool DeleteExistingBonus(ImportBonusModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                Period=bonus.PeriodID,
                Bonus=bonus.BonusType,
                salaryID=bonus.SalaryHead,
                comcod=bonus.CompanyID,
                bonus.Grade
            };
            var rowAffect = conn.Execute("sp_DeleteExgistingImportBonus", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        public static bool ImportData(ImportBonusModel model, List<dynamic> details)
        {
            bool isDelete = DeleteExistingBonus(model);
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using(var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach(var importData in details)
                        {
                            string sql = $@"INSERT INTO ImportBonus (Empcode, SalaryHead, Amount, PeriodID, BonusType, CompanyID, PeriodName)
                                            VALUES('{importData.EmpCode}', {model.SalaryHead}, {importData.Amount}, {model.PeriodID},{model.BonusType},{model.CompanyID}, '{model.PeriodName}')";
                            con.Execute(sql, transaction: tran);
                        }
                        tran.Commit();
                        return true;
                    }
                    catch(Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }


    }
}
