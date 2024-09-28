using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using WebApiCore.Models.Loan;
using WebApiCore.ViewModels.Loan;

namespace WebApiCore.DbContext.Loan
{
    public class StopDeductionDb
    {
       public static bool SaveUpdate(StopDeductionSpParametter stopdeduction,int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {

                var paraObj = new
                {
                    stopdeduction.ID,
                    stopdeduction.EmpCode,
                    stopdeduction.PeriodID,
                    stopdeduction.LoanType,
                    stopdeduction.Date,
                    stopdeduction.Remarks,
                    stopdeduction.UserID,
                    stopdeduction.CompanyID,
                    pOptions
                   
                };
                int rowAffect = con.Execute("sp_LoanDeductionStop_New", param: paraObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
    public static List<StopDeductionLoanVM> GetAll(StopDeductionSpParametter stopdeductionparam,int pOptions)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int Grade;
            if (stopdeductionparam.UserTypeID != 1 && stopdeductionparam.UserTypeID != 4)
            {
                Grade = stopdeductionparam.Grade;
            }
            else
            {
                Grade = -1;
            }
            var paramobj = new
            {
                stopdeductionparam.ID,
                stopdeductionparam.EmpCode,
                stopdeductionparam.PeriodID,
                stopdeductionparam.LoanType,
                stopdeductionparam.Date,
                stopdeductionparam.Remarks,
                stopdeductionparam.UserID,
                stopdeductionparam.CompanyID,
                Grade,
                stopdeductionparam.Msg,
                pOptions
            };
            List<StopDeductionLoanVM> stopdeduction = conn.Query<StopDeductionLoanVM>("sp_LoanDeductionStop_New", param: paramobj, commandType: CommandType.StoredProcedure).ToList();
            return stopdeduction;
        }

        public static StopDeductionModel getById(int id)
        {
            var con=new SqlConnection(Connection.ConnectionString());
            StopDeductionModel stopDeduction = con.QuerySingle<StopDeductionModel>("select * from LoanDeductionStop where ID=" + id);
            return stopDeduction;

        }

    }
}
