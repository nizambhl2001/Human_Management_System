using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.ShiftAllowance;
using WebApiCore.Models.ShiftAllowance;
using WebApiCore.ViewModels.ShiftAllowance;

namespace HRMS.DbContext.ShiftAllowance
{
    public class ShiftAllowanceAuto
    {
        public static bool AutoShiftSave(ShiftAllowanceAutoModel autoShift)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                      
                        var ddmmyy = autoShift.Date.Split("/");
                        var year = ddmmyy[2].PadLeft(4, '0');
                        var month = ddmmyy[0].PadLeft(2, '0');
                        var day = ddmmyy[1].PadLeft(2, '0');
                        var yyyymmdd = $"{year}{month}{day}";
                        foreach (var details in autoShift.Details)
                        {
                           object paramObj = new
                                {
                                  
                                    details.EmpCode,
                                    autoShift.PeriodID,
                                    autoShift.SalaryHeadID,
                                    details.Amount,
                                    OTPP= autoShift.OTPP=0,
                                    autoShift.BonusType,
                                    autoShift.CompanyID,
                                    Date= yyyymmdd,
                                   details.DepertmentID

                                };
                                con.Execute("sp_InsertOTAmount", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                           
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


        public static List<ShiftAutoAllowanceVM> GetAllAutoAllowance(ShiftAllowanceAutoParam autopayment)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (autopayment.UserTypeID != 1 && autopayment.UserTypeID != 4)
                {
                    Grade = autopayment.GradeValue;
                }
                else
                {
                    Grade = -1;
                }
                var sdate = autopayment.StrDate.Split("/");
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
                var edate = autopayment.EndDate.Split("/");
                var eyear = sdate[2].PadLeft(4, '0');
                var emonth = sdate[0].PadLeft(2, '0');
                var eday = sdate[1].PadLeft(2, '0');
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
                    autopayment.EmpCode,
                    GradeValue=Grade,
                    DepartmentID = autopayment.DepertmentID,
                    autopayment.BranchID,
                    StrDate = startdate,
                    EndDate = enddate,
                    autopayment.CompanyID,
                    autopayment.Unite,
                    autopayment.Line

                };
                List<ShiftAutoAllowanceVM> assingShiftAllowance =
                    con.Query<ShiftAutoAllowanceVM>("spGetShiftAllowanceAmount", paramObj,
                        commandType: CommandType.StoredProcedure, commandTimeout: 50000).ToList();
                return assingShiftAllowance;
            }
        }


        public static AutoMenualModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var payment = conn.QuerySingle<AutoMenualModel>("SELECT * FROM OtherPayment WHERE ID="+id);
            return payment;
        }
        public static bool Delete(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int result = conn.Execute("DELETE OtherPayment WHERE ID=" + id);
            return result>0;
        }
    }
}
