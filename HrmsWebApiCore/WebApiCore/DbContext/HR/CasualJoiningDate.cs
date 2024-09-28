using System;
using System.Data;
using System.Data.SqlClient;
using Dapper.Framework;
using WebApiCore.Models.HR;

namespace WebApiCore.DbContext.HR
{
    public class CasualJoiningDate
    {
        public static CasualJoiningDateModel GetById(string empCode,int companyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<CasualJoiningDateModel>("SELECT EmpCode, EmpName, Department, Designation, JoiningDate  FROM View_EmployeeAll WHERE EmpCode='" + empCode+"' And CompanyID="+companyID);
            try
            {
                var dataset2 = conn.QuerySingle<CasualJoiningDateModel>("SELECT * FROM CasualJoining WHERE EmpCode='" + empCode+"' And CompanyID="+companyID);
                dataset.CasualJoining = dataset2.CasualJoining;
                dataset.Date = dataset2.Date;
            }
            catch (Exception)
            {

            }
            return dataset;

        }
        public static CasualJoiningDateModel GetDateById(string empCode,int comanyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<CasualJoiningDateModel>("SELECT * FROM CasualJoining WHERE EmpCode="+empCode+"And CompanyID="+comanyId);
            return data;
        }

        public static bool SaveUpdate(CasualJoiningDateModel casualJoin)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                casualJoin.EmpCode,
                casualJoin.JoiningDate,
                casualJoin.CasualJoining,
                casualJoin.Date,
                casualJoin.CompanyID
            };
            int rowAffect = conn.Execute("sp_EmpCasualJoining_Save", param: param,
                commandType: CommandType.StoredProcedure);
                return rowAffect>0;
        }
    }
}