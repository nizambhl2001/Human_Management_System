using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.DbContext.Deduction
{
    public class LWPdeductDB
    {
        public static List<AllDeductionVM> GetAllLWPDeduct(LWPdeductParater lwpdeduct)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (lwpdeduct.UserTypeID != 1 && lwpdeduct.UserTypeID != 4)
                {
                    Grade = lwpdeduct.Grade;
                }
                else
                {
                    Grade = -1;
                }
                
                var sdate = lwpdeduct.StrDate.Split("/");
                var syear = sdate[2].PadLeft(4, '0');
                var smonth = sdate[0].PadLeft(2, '0');
                var sday = sdate[1].PadLeft(2, '0');
                if (sday.Length < 2)
                {
                    sday = "0" + sday;
                }
                if (smonth.Length < 2)
                {
                    smonth = "0" + smonth;
                }
             
                var startdate = $"{syear}{smonth}{sday}";
                var edate = lwpdeduct.Enddate.Split("/");
                var eyear = edate[2].PadLeft(4, '0');
                var emonth = edate[0].PadLeft(2, '0');
                var eday = edate[1].PadLeft(2, '0');
                if (eday.Length < 2)
                {
                    eday = "0" + eday;
                }
                if (emonth.Length < 2)
                {
                    emonth = "0" + emonth;
                }
                var enddate = $"{eyear}{emonth}{eday}";
                var paramObj = new
                {
                    lwpdeduct.TaxYearID,
                    lwpdeduct.PeriodID,
                    lwpdeduct.PeriodName,
                    lwpdeduct.YearID,
                    Salaryhead = lwpdeduct.SalaryHeadID=23,
                    EmployeeCode = lwpdeduct.EmpCode,
                    lwpdeduct.CompanyID,
                    Depertment= lwpdeduct.Department,
                    Grade,
                    StrDate=startdate,
                   Enddate=enddate
                };
                List<AllDeductionVM> lwpdedct =
                    con.Query<AllDeductionVM>("spGetLWPDeduct", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return lwpdedct;
            }
        }
        public static bool SaveUpdate(AllDeductionModel lwpdeduction)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in lwpdeduction.SelectedDriver)
                        {
                            object paramObj = new
                            {

                                salarytype = 1,
                                EmpID = lwpdeduction.EmpID = 0,
                                item.StructureID,
                                item.SalaryHeadID,
                                item.SalaryHeadType,
                                lwpdeduction.YearID,
                                lwpdeduction.TaxYearID,
                                item.SalaryTypeID,
                                item.BasedOnID,
                                item.CreatedDate,
                                lwpdeduction.PeriodID,
                                item.SortOrder,
                                lwpdeduction.CompanyID,
                                lwpdeduction.PeriodName,
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
