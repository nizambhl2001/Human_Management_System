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
    public class FestivalBonus
    {
        public static List<SalaryPeriodModel> GetAllPeriod()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<SalaryPeriodModel>("SELECT * FROM SalaryPeriod Order By ID DESC").ToList();
            return dataset;
        }
         public static List<FestivalBonusViewModel> getAllBonus(FestivalBonusModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {

                Department=bonus.Department??"-1",
                companyid = bonus.CompanyID,
                bonus.GradeID,
                bonus.BonusType,
                JobType=bonus.JobType??-1
            };
           
            var dataset = conn.Query<FestivalBonusViewModel>("sp_GetBonusForGrid",param:peram,commandType:System.Data.CommandType.StoredProcedure).ToList();
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
                                bonus.Date,
                                bonus.OTPP,
                                emp.EmpCode,
                                bonus.DepertmentID,
                                emp.Amount
                            };
                            con.Execute("sp_InsertBonus",param:obj,transaction:tran,commandType:System.Data.CommandType.StoredProcedure);
                             
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
