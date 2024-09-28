using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;
using Dapper.Framework;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class EmployeeExtraSalary
    {
        public static List<EmployeeExtraSalaryViewModel> GetOtherPayment(EmployeeExtraSalaryModel extraSalaryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode=extraSalaryModel.EmpCode,
                PeriodId=extraSalaryModel.PeriodID??-1,
                BonustypeId=extraSalaryModel.BonustypeID??-1,
                GradeValue=extraSalaryModel.Grade??-1,
                CompanyID=extraSalaryModel.CompanyID??-1
            };
            List<EmployeeExtraSalaryViewModel> result = conn.Query<EmployeeExtraSalaryViewModel>("sp_GetOtherPayment", param: obj, commandType: CommandType.StoredProcedure,commandTimeout:300).ToList();
            return result;
        }

        public static bool SaveEmpExtraSalary(EmployeeExtraSalaryModel extraSalaryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());

            conn.Open();
            using (var tran = conn.BeginTransaction())
            {
                try
                {
                    foreach (var item in extraSalaryModel.empExtraSalary)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = "sp_InsertExcessSalary";
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@EmpCode", item.EmpCode);
                            cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
                            cmd.Parameters.AddWithValue("@Amount", item.Amount);
                            cmd.Parameters.AddWithValue("@PeriodID", extraSalaryModel.PeriodID);
                            cmd.Parameters.AddWithValue("@CompanyID", extraSalaryModel.CompanyID);
                            cmd.Parameters.AddWithValue("@Note", item.Note);
                            cmd.Parameters.AddWithValue("@BonusType", extraSalaryModel.BonustypeID);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    tran.Commit();
                    return true;
                }
                catch (Exception err)
                {

                    throw new Exception(err.Message);
                }
                
            }
        }
    }
}
