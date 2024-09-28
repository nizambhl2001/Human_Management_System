using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class BlockSalaryProcess
    {
        public static List<BlockSalaryProcessViewModel> GetBlockEmployee(BlockSalaryProcessModel parammodel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            if (parammodel.UserTypeID != 1 && parammodel.UserTypeID != 4)
            {
                parammodel.Grade = 0;
            }

            else
            {
                parammodel.Grade = -1;
            }
            var obj = new
            {
                parammodel.TaxYearID,
                parammodel.PeriodID,
                parammodel.PeriodName,
                parammodel.YearID,
                parammodel.Salaryhead,
                parammodel.EmployeeCode,
                parammodel.CompanyID,
                parammodel.Grade,
                Depertment = ""
            };

            List<BlockSalaryProcessViewModel> result = conn.Query<BlockSalaryProcessViewModel>("spGetSalaryBlock", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }

        public static bool ProcessEmpSalaryBlock(BlockSalaryProcessModel processModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            using (var tran = conn.BeginTransaction())
            {
                if (processModel.UserTypeID != 1 && processModel.UserTypeID != 4)
                {
                    processModel.Grade = 0;
                }

                else
                {
                    processModel.Grade = -1;
                }
                try
                {
                    foreach (var item in processModel.BlockSalaryViewModel)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = "spProcessEmpSalaryPayScaleBlock";
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@PeriodID", processModel.PeriodID);
                            cmd.Parameters.AddWithValue("@StructureID", item.StructureID);
                            cmd.Parameters.AddWithValue("@TaxYearID", item.TaxYearID);
                            cmd.Parameters.AddWithValue("@PeriodName", item.PeriodName);
                            cmd.Parameters.AddWithValue("@YearID", item.YearID);
                            cmd.Parameters.AddWithValue("@EmployeeCode", item.EmpCode);
                            cmd.Parameters.AddWithValue("@CompanyID", processModel.CompanyID);
                            cmd.Parameters.AddWithValue("@Grade", processModel.Grade);
                            cmd.Parameters.AddWithValue("@Bonustype", processModel.Bonustype);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    tran.Commit();
                    ProcessEmpAdvanceSalary(processModel);
                    return true;
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw new Exception(err.Message);
                }
            }           
        }

        public static bool ProcessEmpAdvanceSalary(BlockSalaryProcessModel empAdvanceModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            var Block = "Yes";
            using (var tran = conn.BeginTransaction())
            {
                if (empAdvanceModel.UserTypeID != 1 && empAdvanceModel.UserTypeID != 4)
                {
                    empAdvanceModel.Grade = 0;
                }

                else
                {
                    empAdvanceModel.Grade = -1;
                }
                try
                {
                    foreach (var item in empAdvanceModel.BlockSalaryViewModel)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = "spProcessEmpLoanPayscale";
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@PeriodID", empAdvanceModel.PeriodID);
                            cmd.Parameters.AddWithValue("@StructureID", item.StructureID);
                            cmd.Parameters.AddWithValue("@TaxYearID", item.TaxYearID);
                            cmd.Parameters.AddWithValue("@PeriodName", item.PeriodName);
                            cmd.Parameters.AddWithValue("@YearID", item.YearID);
                            cmd.Parameters.AddWithValue("@EmployeeCode", item.EmpCode);
                            cmd.Parameters.AddWithValue("@CompanyID", empAdvanceModel.CompanyID);
                            cmd.Parameters.AddWithValue("@Grade", empAdvanceModel.Grade);
                            cmd.Parameters.AddWithValue("@Block", Block);
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
    }
}
