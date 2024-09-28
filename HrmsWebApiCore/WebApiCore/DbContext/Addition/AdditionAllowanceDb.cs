using Dapper.Framework;
using HRMS.Models.SalarySetup;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.DbContext.FinalSattlement;
using WebApiCore.Models;
using WebApiCore.Models.Addition;
using WebApiCore.Models.Deduction;
using WebApiCore.Models.ShiftAllowance;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Addition
{
    public class AdditionAllowanceDb
    {

        public static List<AllDeductionVM> GetAllAdditionAllowance(AdditionNDDeductionGetAllParam additionAllwnce)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (additionAllwnce.UserTypeID != 1 && additionAllwnce.UserTypeID !=4)
                {
                    Grade = additionAllwnce.Grade;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                   additionAllwnce.TaxYearID,
                   additionAllwnce.PeriodID,
                   additionAllwnce.PeriodName,
                   additionAllwnce.YearID,
                   Salaryhead = additionAllwnce.SalaryHeadID,
                   EmployeeCode =additionAllwnce.EmpCode,
                   additionAllwnce.CompanyID,
                   Grade,
                   Depertment=additionAllwnce.Department
                };
                List<AllDeductionVM> addallowance =
                    con.Query<AllDeductionVM>("spDetOtherAllowance", param: paramObj,
                        commandType: CommandType.StoredProcedure).ToList();
                return addallowance;
            }
        }
      
        public static bool SaveUpdate(AllDeductionModel addAllowance)
        {

            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            {
                using (var tran = conn.BeginTransaction()) 
                {
                    try
                    {
                        foreach (var item in addAllowance.SelectedDriver)
                        {
                            using (var cmd = new SqlCommand())
                            {
                                cmd.CommandText = "sp_InsertPersonalAllowance";
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@salarytype", 1);
                                cmd.Parameters.AddWithValue("@EmpID", 0);
                                cmd.Parameters.AddWithValue("@EmpCode", item.EmpCode);
                                cmd.Parameters.AddWithValue("@StructureID", item.StructureID);
                                cmd.Parameters.AddWithValue("@SalaryHeadID", addAllowance.SalaryHeadID);
                                cmd.Parameters.AddWithValue("@SalaryHeadType", item.SalaryHeadType);
                                cmd.Parameters.AddWithValue("@YearID", addAllowance.YearID);
                                cmd.Parameters.AddWithValue("@TaxYearID", addAllowance.TaxYearID);
                                cmd.Parameters.AddWithValue("@Amount", item.Amount);
                                cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
                                cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
                                cmd.Parameters.AddWithValue("@CreatedDate", item.CreatedDate);
                                cmd.Parameters.AddWithValue("@PeriodID", addAllowance.PeriodID);
                                cmd.Parameters.AddWithValue("@SortOrder", item.SortOrder);
                                cmd.Parameters.AddWithValue("@CompanyID", addAllowance.CompanyID);
                                cmd.Parameters.AddWithValue("@PeriodName", addAllowance.PeriodName);
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

        public static List<SalaryHeadModel> GetAllbysalryHeadtype()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            List<SalaryHeadModel> result = con.Query<SalaryHeadModel>("SELECT * FROM SalaryHead where SalaryHeadType='Addition' and AccountTypeID=1" ).ToList();
            return (result);
        }

        public static List<AllDeductionVM> checkSalaryPeriod(AllDeductionModel salaryLock)
        {
           
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (salaryLock.UserTypeID != 1 && salaryLock.UserTypeID != 4)
                {
                    Grade = salaryLock.Grade;
                }
                else
                {
                    Grade = -1;
                }
                var paramOb = new
                {
                    Period = salaryLock.PeriodID,
                    salaryLock.CompanyID,
                    Grade

                };
           
            List<AllDeductionVM> salarylock = con.Query<AllDeductionVM>("Sp_GetSalarylOCKInfo", param: paramOb,
                    commandType: CommandType.StoredProcedure).ToList();
            return salarylock;
            }
        }
    }
}
