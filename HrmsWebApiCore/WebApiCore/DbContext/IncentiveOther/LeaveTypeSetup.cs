using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncentiveOther;

namespace WebApiCore.DbContext.IncentiveOther
{
    public class LeaveTypeSetup
    {
        public static bool Save(LeaveTypeSetupModel leave)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
                var peram =new
                {
                    leave.ID,
                    leave.EmpGrade,
                    leave.LeaveTypeID,
                    leave.Numberoftimes,
                    leave.Note,
                    leave.EDate,
                    leave.CompanyID,
                    leave.UserID
                };
            var rowAffect = conn.Execute("INSertEncashLeaveSetup",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
            
        }
        public static List<LeaveTypeSetupModel> getAll(int CompanyID,int GradeValue)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                CompanyID,
                GradeValue
            };
            var getAll = conn.Query<LeaveTypeSetupModel>("sp_LeaveEncashLeavesetup_List",param:param,commandType:System.Data.CommandType.StoredProcedure).ToList();
            return getAll;
        }
        public static LeaveTypeSetupModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var leave = conn.QuerySingle<LeaveTypeSetupModel>("SELECT * FROM EncashLeaveSetup WHERE ID=" + id);
            return leave;
        }


    }
}
