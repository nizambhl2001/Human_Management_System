using Dapper.Framework;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class LeavingReason
    {
        public static List<LeavingReasonModel> getAllLeavingReason()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var reasonList = conn.Query<LeavingReasonModel>("SELECT * FROM tblLeavingResaon").ToList();
            return reasonList;
        }
    }
}
