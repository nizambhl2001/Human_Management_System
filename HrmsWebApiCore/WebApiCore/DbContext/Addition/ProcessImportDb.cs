using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using HRMS.Models.SalarySetup;
using WebApiCore.Models;
using WebApiCore.Models.Addition;
using WebApiCore.ViewModels.Addition;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Addition
{
    public class ProcessImportDb
    {
        public static List<ProcessInportVM> GetAllProcImport(AdditionNDDeductionGetAllParam procImport)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (procImport.UserTypeID != 1 && procImport.UserTypeID != 4)
                {
                    Grade = procImport.Grade;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                    procImport.TaxYearID,
                    procImport.PeriodID,
                    procImport.PeriodName,
                    procImport.YearID,
                    Salaryhead = procImport.SalaryHeadID,
                    EmployeeCode = procImport.EmpCode,
                    procImport.CompanyID,
                    Depertment = procImport.Department,
                    Grade
                };
                List<ProcessInportVM> procImpData =
                    con.Query<ProcessInportVM>("spGetSalaryImport", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return procImpData;
            }
        }


        public static List<SalaryHeadModel> GetImportedSalaryHead(int periodID, int companyID)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    PeriodID = periodID,
                    CompanyID = companyID

                };
                List<SalaryHeadModel> importedsalaryhead =
                    con.Query<SalaryHeadModel>("sp_getImportedSalaryHead", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return importedsalaryhead;
            }
        }
        public static bool SaveUpdate(ProcessImportAdditionModel procImport, string type)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        if (type == "Addition")
                        {
                            procImport.SalaryHeadType = 1;
                            procImport.SalaryTypeID = 1;
                        }
                        else
                        {
                            procImport.SalaryHeadType = 2;
                            procImport.SalaryTypeID = 2;
                        }
                        foreach (var item in procImport.SelectedDriver)
                        {


                            object paramObj = new
                            {
                                salarytype = 1,
                                EmpID = procImport.EmpID = 0,
                                item.StructureID,
                                procImport.SalaryHeadID,
                                procImport.SalaryHeadType,
                                procImport.YearID,
                                procImport.TaxYearID,
                                procImport.SalaryTypeID,
                                item.BasedOnID,
                                item.CreatedDate,
                                procImport.PeriodID,
                                item.SortOrder,
                                procImport.CompanyID,
                                procImport.PeriodName,
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
        public static List<AllDeductionVM> CheckSalaryPeriod(ProcessImportAdditionModel salaryLock)
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

