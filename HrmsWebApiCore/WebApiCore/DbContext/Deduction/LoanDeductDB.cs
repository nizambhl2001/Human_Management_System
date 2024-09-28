using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Framework;
using HRMS.Models.SalarySetup;
using WebApiCore.Models;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Deduction
{
    public class LoanDeductDB
    {
        public static List<SalaryHeadModel> getloan(int companyID)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramObj = new
            {
                CompanyID = companyID
            };
            List<SalaryHeadModel> londeduct = con
                .Query<SalaryHeadModel>("spGetLoan", param: paramObj, commandType: CommandType.StoredProcedure)
                .ToList();
            return londeduct;
        }

        public static List<AllDeductionVM> GetAllLoanDeduct(AdditionNDDeductionGetAllParam losndeduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (losndeduct.UserTypeID != 1 && losndeduct.UserTypeID != 4)
                {
                    Grade = losndeduct.Grade;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                    losndeduct.TaxYearID,
                    losndeduct.PeriodID,
                    losndeduct.PeriodName,
                    losndeduct.YearID,
                    Salaryhead = losndeduct.SalaryHeadID,
                    EmployeeCode = losndeduct.EmpCode,
                    losndeduct.CompanyID,
                    Depertment=losndeduct.Department,
                    Grade
                };
                List<AllDeductionVM> loandedct =
                    con.Query<AllDeductionVM>("spGetLoanAmount", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return loandedct;
            }
        }
      
        public static bool SaveUpdate(AllDeductionModel loanduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in loanduct.SelectedDriver)
                        {
                            object paramObj = new
                            {

                                salarytype = 1,
                                EmpID = loanduct.EmpID = 0,
                                item.StructureID,
                                loanduct.SalaryHeadID,
                                item.SalaryHeadType,
                                loanduct.YearID,
                                loanduct.TaxYearID,
                                item.SalaryTypeID,
                                item.BasedOnID,
                                item.CreatedDate,
                                loanduct.PeriodID,
                                item.SortOrder,
                                loanduct.CompanyID,
                                loanduct.PeriodName,
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
