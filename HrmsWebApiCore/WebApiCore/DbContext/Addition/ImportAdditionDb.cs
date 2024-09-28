using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Addition;

namespace WebApiCore.DbContext.Addition
{
    public class ImportAdditionDb
    {

        public static bool DeleteExistingSalaryImport(ImportAdditionModel bonus)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                Period = bonus.PeriodID,
                salaryID = bonus.SalaryHead,
                comcod = bonus.CompanyID,
                Grade = (bonus.Grade==1 || bonus.Grade==4)?-1:bonus.Grade
            };
            var rowAffect = conn.Execute("sp_DeleteExgistingImport", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static bool ImportData(ImportAdditionModel model, List<dynamic> details)
        {
            bool isDelete = DeleteExistingSalaryImport(model);
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var importData in details)
                        {
                            string sql = $@"INSERT INTO ImportSalary (Empcode, SalaryHead, Amount, PeriodID, CompanyID, PeriodName)
                                            VALUES('{importData.EmpCode}', {model.SalaryHead}, {importData.Amount}, {model.PeriodID},{model.CompanyID}, '{model.PeriodName}')";
                            con.Execute(sql, transaction: tran);
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
