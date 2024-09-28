using HRMS.Models.DiciplinaryAction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper.Framework;
using System.Data.SqlClient;
using System.Data;
using HRMS.ViewModels.DisciplinaryAction;
//using HRMS.Models.SyetemSetup;
using WebApiCore.Models.SystemSetup;

namespace HRMS.DbContext.DiciplinaryAction
{
    public class ShowCauseResults
    {
        public static bool SaveShowCauseResult(ShowCauseResultModel showCause)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var shocaseModel = new
            {
                showCause.ID,
                showCause.EmpCode,
                showCause.ShowCauseTypeID,
                showCause.ShowCauseResultID,
                showCause.StartDate,
                showCause.EndDate,
                showCause.Date,
                showCause.Note,
                showCause.UserID,
                showCause.CompanyID,
                
            };

            int rowAffected = con.Execute("sp_ShowCauseResult", param: shocaseModel, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }



        public static List<ShowCauseResultModel> GetAllShowCauseResult()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<ShowCauseResultModel>("SELECT * FROM ShowCauseResult").ToList();
            return data;
        }




        public static ShowCauseResultModel GetByShowCauseResultId(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                ShowCauseResultModel dept = con.QuerySingle<ShowCauseResultModel>("SELECT * FROM ShowCauseResult WHERE ID=" + id);
                return dept;
            }
        }

        //public static ShowCauseResult GetByShowCauseResultId(int id)
        //{
        //    using (var con = new SqlConnection(Connection.ConnectionString()))
        //    {
        //        ShowCauseResult dept = con.QuerySingle<ShowCauseResult>("SELECT * FROM ShowCauseResult WHERE ID=" + id);
        //        return dept;
        //    }
        //}


        //public static List<ShowCauseResult> GetAllShowCauseList(string? , int comId, int grade)
        //{
        //    var conn = new SqlConnection(Connection.ConnectionString());
        //    var data = conn.Query<ShowCauseResult>("SELECT * FROM ShowCauseResult").ToList();
        //    return data;
        //}
        public static List<ShowCauseResultViewModel> GetAllShowCaseResultList(string empCode, int gradeValue, int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());

            var paramobj = new
            {
                EmpCode = empCode,
                GradeValue = gradeValue,
                CompanyID = comId
            };
            List<ShowCauseResultViewModel>ShowCaseResultList = conn.Query<ShowCauseResultViewModel>("sp_ShowCauseResult_List",param:paramobj,commandType:CommandType.StoredProcedure).ToList();
            return ShowCaseResultList;
        }

        //-----------All ShowCause Result Type----------------------


        

    }
}