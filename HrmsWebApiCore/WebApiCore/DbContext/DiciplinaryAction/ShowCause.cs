using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.Diciplinary_Action;

namespace HRMS.DbContext.DiciplinaryAction
{
    public  class ShowCause
    {
        public static bool SaveShowCause(ShowCase showCause)
        {
            if(showCause.StartDate==null)
            {
                showCause.StartDate = DateTime.Now;
            }
            if (showCause.EndDate == null)
            {
                showCause.EndDate = DateTime.Now ;
            }
            var con = new SqlConnection(Connection.ConnectionString());
            var shocaseModel = new
            {
                showCause.ID,
                showCause.EmpCode,
                showCause.Type,
                showCause.ShowcaseDate,
                showCause.StartDate,
                showCause.EndDate,
                showCause.Action,
                showCause.UserID,
                showCause.CompanyID,
                showCause.Remarks
            };

            int rowAffected = con.Execute("sp_ShowcaseInser_Update", param: shocaseModel, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }



        public static List<ShowCase> GetShowCases()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<ShowCase>("SELECT * FROM Showcase").ToList();
            return data;
        }

        public static ShowCase GetByShowCauseId(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                ShowCase dept = con.QuerySingle<ShowCase>("SELECT * FROM Showcase WHERE ID=" + id);
                return dept;
            }
        }

        public static bool DeleteShowCause(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE Showcase WHERE EmpCode=" + id);
                return rowAffect > 0;
            }
        }

    }
}