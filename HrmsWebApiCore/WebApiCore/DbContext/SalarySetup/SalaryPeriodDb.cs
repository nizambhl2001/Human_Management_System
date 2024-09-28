using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.SalarySetup;


namespace HRMS.DbContext.SalarySetup
{
    public class SalaryPeriodDb
    {
        public static List<MonthModel> GetAllMonth()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var month = con.Query<MonthModel>("select * from Month").ToList();
            return (month);
        }

        public static List<TaxYear> GetTaxYears()
        {
            var con=new SqlConnection(Connection.ConnectionString());
            var taxYears = con.Query<TaxYear>("select * from TaxYearInfo").ToList();
            return (taxYears);
        }
       
        public static SalaryPeriodModel GetAllbyId(int id)
        {
            var con=new SqlConnection(Connection.ConnectionString());
            var result = con.QuerySingle<SalaryPeriodModel>("SELECT * FROM SalaryPeriod where ID="+id);
            return (result);
        }

        public static void valueCalcution(SalaryPeriodModel valcal)
        {
            switch (valcal.MonthName)
            {
                case "July":
                    valcal.PeriodValue = 12;
                    valcal.PeriodValueREVERS = 0;
                    valcal.Taxcard = 11;
                    break;
                case "August":
                    valcal.PeriodValue = 11;
                    valcal.PeriodValueREVERS = 1;
                    valcal.Taxcard = 10;
                    break;
                case "September":
                    valcal.PeriodValue = 10;
                    valcal.PeriodValueREVERS = 2;
                    valcal.Taxcard = 9;
                    break;
                case "October":
                    valcal.PeriodValue = 9;
                    valcal.PeriodValueREVERS = 3;
                    valcal.Taxcard = 8;
                    break;
                case "November":
                    valcal.PeriodValue = 8;
                    valcal.PeriodValueREVERS = 4;
                    valcal.Taxcard = 7;
                    break;
                case "December":
                    valcal.PeriodValue = 7;
                    valcal.PeriodValueREVERS = 5;
                    valcal.Taxcard = 6;
                    break;
                case "January":
                    valcal.PeriodValue = 6;
                    valcal.PeriodValueREVERS = 6;
                    valcal.Taxcard = 5;
                    break;
                case "February":
                    valcal.PeriodValue =5;
                    valcal.PeriodValueREVERS = 7;
                    valcal.Taxcard =4;
                    break;
                case "March":
                    valcal.PeriodValue = 4;
                    valcal.PeriodValueREVERS = 8;
                    valcal.Taxcard = 3;
                    break;
                case "April":
                    valcal.PeriodValue = 3;
                    valcal.PeriodValueREVERS = 9;
                    valcal.Taxcard = 2;
                    break;
                case "May":
                    valcal.PeriodValue = 2;
                    valcal.PeriodValueREVERS = 10;
                    valcal.Taxcard = 1;
                    break;
               
                default:
                    valcal.PeriodValue = 1;
                    valcal.PeriodValueREVERS = 11;
                    valcal.Taxcard = 0;
                    break;

            }
        }
        public static bool SaveSalPeriod(SalaryPeriodModel salperiod)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                valueCalcution(salperiod);
                var paraObj = new
                {
                    salperiod.ID,
                    salperiod.PeriodName,
                    salperiod.MonthName,
                    salperiod.YearID,
                    salperiod.YearName,
                    salperiod.FinancialYear,
                    salperiod.TaxYearID,
                    salperiod.TaxYear,
                    salperiod.CreatedDate,
                    salperiod.SortOrder,
                    salperiod.CompanyID,
                    salperiod.PeriodValue,
                    salperiod.PeriodValueREVERS,
                    salperiod.Taxcard,
                    salperiod.SDate,
                    salperiod.EDate
                };
                int rowAffect = con.Execute("INSertSalaryPeriodSetup", param: paraObj,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;

            }
        }
        public static List<SalaryPeriodModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<SalaryPeriodModel>("SELECT * FROM SalaryPeriod ORDER BY ID DESC").ToList();
            return (dataset);
        }






    }
}


