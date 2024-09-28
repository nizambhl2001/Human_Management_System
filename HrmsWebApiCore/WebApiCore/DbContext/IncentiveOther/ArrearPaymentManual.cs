using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Bonus;

namespace WebApiCore.DbContext.IncentiveOther
{
    public class ArrearPaymentManual
    {
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
                                emp.SalaryHeadID,
                                bonus.Date,
                                bonus.OTPP,
                                emp.EmpCode,
                                DepertmentID = bonus.DepartmentID,
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
