using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using WebApiCore.Models.SalaryProcess;
using Dapper.Framework;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class UndoSalaryProcess
    {

        // Check Salary Lock 
        public static List<UndoSalaryProcessModel> ChaqueSalarylOCK(UndoSalaryProcessModel undoSalaryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
           

            var obj = new
            {
                Period=undoSalaryModel.PeriodID,
                CompanyID=undoSalaryModel.CompanyID,
                Grade = undoSalaryModel.Grade,
            };
            List<UndoSalaryProcessModel> result = conn.Query<UndoSalaryProcessModel>("Sp_GetSalarylOCKInfo", param:obj,commandType:CommandType.StoredProcedure).ToList();
           
                return result;
          }


        // Get Salary Info and Delete Existing Salary

        public static bool GetSalaryUndoInfo(UndoSalaryProcessModel undoSalaryProcess)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
        
           
            
            var obj = new
            {
                Period = undoSalaryProcess.PeriodID,
                Grade=1,
                CompanyID=undoSalaryProcess.CompanyID
            };

            List<UndoSalaryProcessModel> result = conn.Query<UndoSalaryProcessModel>("Sp_GetSalaryUndoInfo", param: obj, commandType: CommandType.StoredProcedure).ToList();

            conn.Open();
            using (var tran=conn.BeginTransaction())
            {
                try
                {
                    if (result.Count < 1)
                    {
                        DeleteExistingSalaryProcess(undoSalaryProcess);
                    }
                    else
                    {
                        return false;
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
        // Delete Existing Salary Process
        public static bool DeleteExistingSalaryProcess(UndoSalaryProcessModel deleteExistSalary)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
           
            var obj = new
            {
                Period = deleteExistSalary.PeriodID,
                CompanyID = deleteExistSalary.CompanyID
            };
            try
            {
                int result = conn.Execute("Sp_UndoSalary", param: obj, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
            

        }

    }
}
