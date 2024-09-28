using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    public class UpdateBonus
    {
        public static List<FestivalBonusModel> getAllBonus(FestivalBonusModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                bonus.EmpCode,
                bonus.PeriodID,
                DepertMentID = bonus.DepartmentID,
                bonus.DesignationID,
                bonus.SalaryHeadID,
                bonus.CompanyID,
                bonus.Grade,
                bonus.BonusType,
            };

            var dataset = conn.Query<FestivalBonusModel>("sp_GetBonusForUpdate", param: peram, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }
        public static bool Update(List<FestivalBonusModel> bonus)
        {

            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var b in bonus)
                        {

                            var obj = new
                            {
                                b.BonusType,
                                b.CompanyID,
                                b.PeriodID,
                                b.SalaryHeadID,
                                Date = b.Date,
                                b.OTPP,
                                b.EmpCode,
                                b.DepertmentID,
                                b.Amount
                            };
                            con.Execute("sp_UpdateBonus", param: obj, transaction: tran, commandType: System.Data.CommandType.StoredProcedure);

                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }
    }
}
