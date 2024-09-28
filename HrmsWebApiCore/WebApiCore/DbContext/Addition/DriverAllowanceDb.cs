using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Framework;
using HRMS.Models.Addition;
using HRMS.Models.SalarySetup;

namespace WebApiCore.DbContext.Addition
{
    public class DriverAllowanceDb
    {
      
        public static bool SaveUpdate(DriverAllowanceModel drvallowance)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in drvallowance.SelectedDriver)
                        {
                            object paramObj = new
                            {
                             
                                           drvallowance.SalaryHeadID,
                                           drvallowance.TaxYearID,
                                           item.SalaryTypeID,
                                           drvallowance.PeriodID,
                                           drvallowance.CompanyID,
                                           drvallowance.PeriodName,
                                           item.EmpCode,
                                           item.Amount
                            };

                            con.Execute("sp_InsertDriverAllowance", param: paramObj, transaction: tran,
                                commandType: CommandType.StoredProcedure);
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
