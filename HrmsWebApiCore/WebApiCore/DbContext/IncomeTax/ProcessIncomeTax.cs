using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.DbContext.IncomeTax
{
    public class ProcessIncomeTax
    {
        public static bool PreProcess(ProcessIncomeTaxParametarModel model)
        {
            List<ChaqueSalaryTaxModel> taxSlab = CheckTaxSalbInfo(model);
            if (taxSlab.Count > 0)
            {
                List<ChaqueSalaryTaxModel> processInfo = GetPreProcessInfo(model);
                if (processInfo.Count == 0)
                {
                    ProcessPreCompanyTax(model);
                    return true;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                throw new Exception("Setup tax slab!");
            }
        }

        public static int Process(ProcessIncomeTaxParametarModel model)
        {
            List<ChaqueSalaryTaxModel> taxSlab = CheckTaxSalbInfo(model);
            if (taxSlab.Count > 0)
            {
                List<ChaqueSalaryTaxModel> processInfo = GetTaxProcessInfo(model);
                if (processInfo.Count == 0)
                {
                    int employees = GetEmployees(model);
                    if (employees > 0)
                    {
                        using (var con = new SqlConnection(Connection.ConnectionString()))
                        {
                            con.Open();
                            using (var tran = con.BeginTransaction())
                            {
                                try
                                {
                                    DeleteExistingSalaryAdditional(model, con, tran);
                                   // ProcessEmpIncomeLWP(model, con, tran);
                                    ProcessEmpIncomeTax(model, con, tran);
                                    ProcessEmpsalaryAdditional(model, con, tran);
                                    tran.Commit();
                                    return employees;
                                }
                                catch (Exception err)
                                {
                                    tran.Rollback();
                                    throw new Exception(err.Message);
                                }
                            }
                        }
                    }
                    else { throw new Exception("Employees not found for Process!"); }
                }
                else { throw new Exception("Tax already processed for this period"); }
            }
            else { throw new Exception("Setup tax slab for this year!"); }
        }

        public static List<ProcessIncomeTaxModel> getAllEmpNameEmpCode()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            try
            {
                string quire = $"select ID, emN.EmpName+' '+emN.LastName AS EmpName,emn.EmpCode from EmpGeneralInfo as emN";
                List<ProcessIncomeTaxModel> processIncomes = conn.Query<ProcessIncomeTaxModel>(quire).ToList();
                return processIncomes;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        // Check Tax Slab Info
        private static List<ChaqueSalaryTaxModel> CheckTaxSalbInfo(ProcessIncomeTaxParametarModel parameterModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            try
            {
                var obj = new
                {
                    parameterModel.TaxYearID,
                    parameterModel.CompanyID
                };
                List<ChaqueSalaryTaxModel> result = conn.Query<ChaqueSalaryTaxModel>("Sp_GetTaxSalbSetupInfo", param: obj, commandTimeout:3600, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        // Check Income Tax Pre Process Info
        private static List<ChaqueSalaryTaxModel> GetPreProcessInfo(ProcessIncomeTaxParametarModel checkPrecomModel)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var obj = new
                {
                    Period = checkPrecomModel.PeriodID,
                    Grade = (checkPrecomModel.UserTypeID != 1 && checkPrecomModel.UserTypeID != 4) ? checkPrecomModel.Grade : -1,
                    checkPrecomModel.CompanyID
                };
                List<ChaqueSalaryTaxModel> chaqueSalaryTaxes = con.Query<ChaqueSalaryTaxModel>("Sp_GetPreProcessInfo", param: obj,commandTimeout:3600, commandType: CommandType.StoredProcedure).ToList();
                return chaqueSalaryTaxes;
            }

        }

        private static List<ChaqueSalaryTaxModel> GetTaxProcessInfo(ProcessIncomeTaxParametarModel checkPrecomModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                Period = checkPrecomModel.PeriodID,
                Grade = (checkPrecomModel.UserTypeID != 1 && checkPrecomModel.UserTypeID != 4) ? checkPrecomModel.Grade : -1,
                checkPrecomModel.CompanyID
            };
            var chaqueSalaryTaxes = conn.Query<ChaqueSalaryTaxModel>("Sp_GetTaxProcessInfo", commandTimeout:20000, param: obj, commandType: CommandType.StoredProcedure).ToList();
            return chaqueSalaryTaxes;
        }

        // Process Pre Company Tax
        private static bool ProcessPreCompanyTax(ProcessIncomeTaxParametarModel model)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        var obj = new
                        {
                            model.PeriodID,
                            model.TaxYearID,
                            model.CompanyID,
                            Grade = (model.UserTypeID != 1 && model.UserTypeID != 4) ? model.Grade : -1,
                            salarytype = model.SalaryType
                        };
                        int rowAffect1 = con.Execute("spProcessEmpPreviousCompanyincome", commandTimeout: 3600, transaction: tran, param: obj, commandType: CommandType.StoredProcedure);
                        var obj2 = new
                        {
                            model.PeriodID,
                            model.TaxYearID,
                            model.CompanyID,
                            Grade = (model.UserTypeID != 1 && model.UserTypeID != 4) ? model.Grade : -1,
                        };
                        int rowAffect2 = con.Execute("spProcessEmpPreCompanyTAX", transaction: tran, commandTimeout: 20000, param: obj2, commandType: CommandType.StoredProcedure);
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

        // Process Income Tax 
        public static int GetEmployees(ProcessIncomeTaxParametarModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPPER(IncomeTex) = 'YES' and CompanyID = {model.CompanyID} and GradeValue ={model.Grade}";
            var result = GetEmployees(quire);
            return result.Count;
        }

        // Delete Existing Salary Additionnal Salary 
        private static bool DeleteExistingSalaryAdditional(ProcessIncomeTaxParametarModel deleteExistingModel, SqlConnection con, SqlTransaction tran)
        {
            string EmpCode = "-1";
            var obj = new
            {
                deleteExistingModel.PeriodID,
                deleteExistingModel.TaxYearID,
                deleteExistingModel.CompanyID,
                Grade = (deleteExistingModel.UserTypeID != 1 && deleteExistingModel.UserTypeID != 4) ? deleteExistingModel.Grade : -1,
                EmpCode
            };
            con.Execute("spDeleteExistingSalaryAdditional",commandTimeout:20000, transaction: tran, param: obj, commandType: CommandType.StoredProcedure);
            return true;
        }

        private static bool ProcessEmpIncomeLWP(ProcessIncomeTaxParametarModel processLwpMoedel, SqlConnection con, SqlTransaction tran)
        {
            var obj = new
            {
                processLwpMoedel.PeriodID,
                processLwpMoedel.CompanyID,
                Grade = (processLwpMoedel.UserTypeID != 1 && processLwpMoedel.UserTypeID != 4) ? processLwpMoedel.Grade : -1,
            };
            int result = con.Execute("spTAXPresentIncomeDatasaveLWP", commandTimeout:20000,transaction: tran, param: obj, commandType: CommandType.StoredProcedure);
            return result > 0;
        }
        // Process Employee IncomeTax
        private static bool ProcessEmpIncomeTax(ProcessIncomeTaxParametarModel processEmpIncomeTax, SqlConnection con, SqlTransaction tran)
        {
            var obj = new
            {
                processEmpIncomeTax.PeriodID,
                processEmpIncomeTax.TaxYearID,
                processEmpIncomeTax.CompanyID,
                PeriodName = processEmpIncomeTax.PeriodName,
                Grade = (processEmpIncomeTax.UserTypeID != 1 && processEmpIncomeTax.UserTypeID != 4) ? processEmpIncomeTax.Grade : -1
            };
            int rowAffect = con.Execute("spProcessEmpTAXPayscale", commandTimeout: 20000, transaction: tran, param: obj, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        private static bool ProcessEmpsalaryAdditional(ProcessIncomeTaxParametarModel empSalaryAddtionalModel, SqlConnection con, SqlTransaction tran)
        {
            var obj = new
            {
                empSalaryAddtionalModel.PeriodID,
                empSalaryAddtionalModel.TaxYearID,
                empSalaryAddtionalModel.CompanyID,
                Grade = (empSalaryAddtionalModel.UserTypeID != 1 && empSalaryAddtionalModel.UserTypeID != 4) ? empSalaryAddtionalModel.Grade : -1
            };
            int rowAffect = con.Execute("spTAXPresentIncomeDatasave",commandTimeout:20000, transaction: tran, param: obj, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        // Quire for Employee List
        public static List<PaySlipEmailViewModel> GetEmployees(string filter)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string sqlString;
            switch (filter)
            {
                case "":
                    sqlString = @"SELECT     dbo.EmployeeInfo.EmpCode, dbo.EmployeeInfo.EmpName, dbo.EmployeeInfo.EmailID, dbo.EmployeeInfo.CompanyID
                                               FROM         dbo.EmployeeInfo INNER JOIN
                                               dbo.ProcessEmpSalaryMaster ON dbo.EmployeeInfo.EmpCode = dbo.ProcessEmpSalaryMaster.EmpCode AND 
                                               dbo.EmployeeInfo.CompanyID = dbo.ProcessEmpSalaryMaster.CompanyID Order by EmpCode ASC";
                    break;
                default:
                    sqlString = string.Format("SELECT EmpCode,EmpName,EmailID,CompanyID FROM EmployeeInfo WHERE {0} Order by EmpCode ASC ", filter);
                    break;

            }

            List<PaySlipEmailViewModel> result = conn.Query<PaySlipEmailViewModel>(sqlString).ToList();
            return result;
        }
        public static bool TaxCardProcess(TaxCardModel taxCard)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                taxCard.EmpCode,
                taxCard.TaxYearID,
                taxCard.CompanyID,
                taxCard.PeriodID
            };
            int rowAffect = conn.Execute("spProcessEmpTAXCard", param: obj, commandType: CommandType.StoredProcedure);
           return rowAffect > 0;
        }


    }
}
