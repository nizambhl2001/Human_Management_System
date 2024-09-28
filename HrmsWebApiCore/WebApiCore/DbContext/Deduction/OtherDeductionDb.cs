using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Deduction
{
    public class OtherDeductionDb
    {
        public static List<AllDeductionVM> GetAllSalaryDeduct(AdditionNDDeductionGetAllParam otherdeduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    otherdeduct.TaxYearID,
                    otherdeduct.PeriodID,
                    otherdeduct.PeriodName,
                    otherdeduct.YearID,
                    Salaryhead = otherdeduct.SalaryHeadID,
                    EmployeeCode =otherdeduct.EmpCode,
                    otherdeduct.CompanyID,
                    Depertment = otherdeduct.Department,
                    otherdeduct.Grade,
                    otherdeduct.Days

                };
                List<AllDeductionVM> othrdeduct =
                    con.Query<AllDeductionVM>("spGetOtherDeductionAmount", param: paramObj,
                        commandType: CommandType.StoredProcedure).ToList();
                return othrdeduct;
            }
        }


        public static bool SaveUpdate(AllDeductionModel otherdeduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in otherdeduct.SelectedDriver)
                        {
                            object paramObj = new
                            {
                                salarytype = 1,
                                EmpID = otherdeduct.EmpID = 0,
                                item.StructureID,
                                otherdeduct.SalaryHeadID,
                                item.SalaryHeadType,
                                otherdeduct.YearID,
                                otherdeduct.TaxYearID,
                                item.SalaryTypeID,
                                item.BasedOnID,
                                item.CreatedDate,
                                otherdeduct.PeriodID,
                                item.SortOrder,
                                otherdeduct.CompanyID,
                                otherdeduct.PeriodName,
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
