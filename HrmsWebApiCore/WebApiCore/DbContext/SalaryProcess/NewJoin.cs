using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class NewJoin
    {
        public static List<NewJoinModel> getNewJoiningInfo(int grade,DateTime sDate,DateTime EDate,int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                Grade=grade,
                StartDate=sDate,
                EndDate=EDate,
                CompanyID = comid
            };

            List<NewJoinModel> resutl = conn.Query<NewJoinModel>("spGetEmpJoinMonthandwithoutEnrolment", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return resutl;
        }
    }
}
