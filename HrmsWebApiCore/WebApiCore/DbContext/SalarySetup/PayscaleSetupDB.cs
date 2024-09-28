using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalarySetup;
using WebApiCore.ViewModels.SalarySetup;

namespace WebApiCore.DbContext.SalarySetup
{
    public class PayscaleSetupDB
    {
        public static List<DetailsPayscaleSetupModel> getallpayscale(string GradeName, int CompanyID)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    GradeName,
                    CompanyID
                };
                List<DetailsPayscaleSetupModel> payscalesetup = con.Query<DetailsPayscaleSetupModel>("Sp_PayscaleGradeNameShow",
                    param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return payscalesetup;

            }
        }
        public static bool saveUpdatePayscalesetup(PayscaleSetup payscale,int SpNo)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string query = $"DELETE FROM SalaryGrade where  GradeName='{payscale.GradeName}' and CompanyID={payscale.CompanyID}";
                con.Execute(query);
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        
                        foreach (var details in payscale.Details)
                        {
                            object paramObj = new
                            {
                                payscale.ID,
                                payscale.GradeName,
                                payscale.GradeValue,
                                payscale.PayscaleYear,
                                payscale.GradeSerial,
                                payscale.CompanyID,
                                details.GradeDescription,
                                details.IncrementAmount,
                                details.Basic,
                                details.Hrent,
                                details.DA,
                                details.Others,
                                details.Convance,
                                details.Medicale,
                                details.Beverage,
                                details.Incentive,
                                details.Entertainment,
                                payscale.Msg,
                                SpNo


                            };
                            con.Execute("sp_SalaryGrade", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
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
