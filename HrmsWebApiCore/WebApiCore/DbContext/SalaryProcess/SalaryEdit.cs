using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class SalaryEdit
    {
        public static List<SalaryEditViewModel> getEmployeeSalaryUpdate(SalaryEditModel salaryEditModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                salaryEditModel.EmpCode,
                PeriodID=salaryEditModel.PeriodID??-1,
                DepertMentID = salaryEditModel.DepartmentID??-1,
                DesignationID=salaryEditModel.DesignationID??-1,
                SalaryHeadID=salaryEditModel.SalaryHeadID??-1,
                salaryEditModel.CompanyID,
                Grade = salaryEditModel.Grade??-1
            };
            List<SalaryEditViewModel> result = conn.Query<SalaryEditViewModel>("sp_GetSalaryForUpdate",param:obj,commandType:CommandType.StoredProcedure).ToList();
            return result;
        }

        public static bool UpdateSalary(SalaryEditModel model)
        { 
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            bool isLocked = ChaqueSalarylOCK(Convert.ToInt32(model.PeriodID), model.CompanyID, model.Grade);
            if (isLocked)
            {
                throw new Exception("This month Salary Already Locked");
            }
                using (var tran = conn.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in model.SalaryEditView)
                        {
                            using (var cmd = new SqlCommand())
                            {
                                cmd.CommandText = "sp_UpdateEmpSalary";
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@CompanyID", model.CompanyID);
                                cmd.Parameters.AddWithValue("@EmpCode", item.EmpCode);
                                cmd.Parameters.AddWithValue("@SalaryHeadID", model.SalaryHeadID);
                                cmd.Parameters.AddWithValue("@Amount", item.Amount);
                                cmd.Parameters.AddWithValue("@PeriodID", model.PeriodID);
                                cmd.ExecuteNonQuery();
                            }
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

        public static bool ChaqueSalarylOCK(int periodId,int comId,int? gradeId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                Period = periodId,
                CompanyID=comId,
                Grade=gradeId
            };

            List<object> result = conn.Query<object>("Sp_GetSalarylOCKInfo", param: obj, commandType: CommandType.StoredProcedure).ToList();
           
            if (result.Count>0)
            {
                return true;
            }
            else
            {
                return false;
            }
           
        }
    }
}
