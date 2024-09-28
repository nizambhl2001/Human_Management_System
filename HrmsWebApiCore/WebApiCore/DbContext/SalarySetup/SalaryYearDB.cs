using Dapper.Framework;
using HRMS.Models.SalarySetup;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
//using DevExpress.Data.Helpers;


namespace HRMS.DbContext.SalarySetup
{
    public class SalaryYearDB
    {
      
        public static List<SalaryYearModel> GetSalaryYear()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.Query<SalaryYearModel>("select * from SalaryYear Order By ID DESC").ToList();
            return (data);
        }

        public static SalaryYearModel getSalaryYearById(int id)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                SalaryYearModel salaryyear = con.QuerySingle<SalaryYearModel>("select * from SalaryYear where ID=" + id);
                return salaryyear;
            }
        }

        public static bool SaveSalaryYear(SalaryYearModel salaryYear)
        {
            string sql = "Insert into SalaryYear ( YearName,StartDate,EndDate,CreatedDate,SortOrder,CompanyID) values ('" +salaryYear.YearName+"','"+salaryYear.StartDate+"','"+salaryYear.EndDate+"','"+salaryYear.CreatedDate+"',"+salaryYear.SortOrder+","+salaryYear.CompanyID+")";


            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(sql);
                return rowAffected > 0;
            }
        }

        public static bool UpdateSalary(SalaryYearModel salaryYear)
        {
            string sql = "update SalaryYear set YearName='" + salaryYear.YearName + "',StartDate='" +
                         salaryYear.StartDate + "',EndDate= '" + salaryYear.EndDate + "',CreatedDate='" +
                         salaryYear.CreatedDate + "',SortOrder= " + salaryYear.SortOrder + ", CompanyID=" +
                         salaryYear.CompanyID + " where ID=" + salaryYear.ID ;
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(sql);
                return rowAffected > 0;
            }
        }

    }
}
