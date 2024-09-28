using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    public class ProcessImportBonus
    {
        public static List<processImportView> GetImportBonus(ProcessBonus bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                CompanyID=bonus.companyid,
                GradeID=bonus.SalaryHeadID,
                BonusType=bonus.Bonustype,
                bonus.PeriodID
            };
            var dataset = conn.Query<processImportView>("sp_GetBonusForGridImport",param:peram,commandType:System.Data.CommandType.StoredProcedure).ToList();
            return dataset;

        }
        public static bool Save(FestivalBonusModel bonus)
        {

            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var emp in bonus.BonusGrid)
                        {

                            var obj = new
                            {
                                bonus.BonusType,
                                bonus.CompanyID,
                                bonus.PeriodID,
                                bonus.SalaryHeadID,
                                Date=DateTime.Now.ToString("yyyymmdd"),
                                OTPP=0,
                                emp.EmpCode,
                                DepertmentID=0,
                                emp.Amount
                            };
                            con.Execute("sp_InsertBonus", param: obj, transaction: tran, commandType: System.Data.CommandType.StoredProcedure);

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
