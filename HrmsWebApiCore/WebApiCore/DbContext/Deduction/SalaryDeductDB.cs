using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WebApiCore.Models;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Deduction
{
    public class SalaryDeductDB
    {
        public static List<AllDeductionVM> GetAllSalaryDeduct(AdditionNDDeductionGetAllParam salarydeduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (salarydeduct.UserTypeID != 1 && salarydeduct.UserTypeID != 4)
                {
                    Grade = salarydeduct.Grade;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                    salarydeduct.TaxYearID,
                    salarydeduct.PeriodID,
                    salarydeduct.PeriodName,
                    salarydeduct.YearID,
                    Salaryhead = salarydeduct.SalaryHeadID,
                    EmployeeCode = salarydeduct.EmpCode,
                    salarydeduct.CompanyID,
                    Depertment = salarydeduct.Department,
                    Grade
                };
                List<AllDeductionVM> saldeduct =
                    con.Query<AllDeductionVM>("spGetSalaryDeduct", param: paramObj,
                        commandType: CommandType.StoredProcedure).ToList();
                return saldeduct;
            }
        }
       

        public static bool SaveUpdate(AllDeductionModel salaryduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in salaryduct.SelectedDriver)
                        {
                            object paramObj = new
                            {
                                salarytype = 1,
                                EmpID=salaryduct.EmpID=0,
                                item.StructureID,
                                salaryduct.SalaryHeadID,
                                item.SalaryHeadType,
                                salaryduct.YearID,
                                salaryduct.TaxYearID,
                                item.SalaryTypeID,
                                item.BasedOnID,
                                item.CreatedDate,
                                salaryduct.PeriodID,
                                item.SortOrder,
                                salaryduct.CompanyID,
                                salaryduct.PeriodName,
                                item.EmpCode,
                                item.Amount
                            };

                            con.Execute("sp_InsertPersonalAllowance", param: paramObj, transaction: tran,
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
