using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class ResignationLettre
    {

        public static bool SaveLettre(ResignationLetterModel resignation)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                resignation.ID,
                resignation.EmpCode,
                resignation.Lettre,
                resignation.Type,
                resignation.LDate,
                resignation.CompanyID,
                resignation.Reason,
                resignation.ApproveType,
                ReqFrom=resignation.ReqTo,
            };
            int rowAffect = conn.Execute("INSertNoticeLettre", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<ResignationLetterModel> getResignationLetter()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<ResignationLetterModel>("SELECT * FROM NoticeLettre WHERE ApproveType=0").ToList();
            return dataset;
        }
        public static  ResignationLetterModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<ResignationLetterModel>(@"SELECT TOP 1 *  FROM NoticeLettre as nl
  LEFT JOIN NoticeLettreStatus as nls ON nls.ResignID = nl.ID WHERE nl.ID="+id+ "Order By nls.ID DESC");
            return dataset;
        }
        public static List<ResignationLetterModel> getResignationLetter(ResignationLetterModel resignation)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                resignation.ID,
                resignation.ReqFrom,
                resignation.ReqTo,
                resignation.Remarks,
                resignation.CompanyID,
                resignation.Msg,
                Type = 4
            };
            var dataset = conn.Query<ResignationLetterModel>("INSertNoticeLettreStatus", param: peram, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }
        public static bool NoticeLettreStatus(ResignationLetterModel resignation)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                resignation.ID,
                resignation.ReqFrom,
                resignation.ReqTo,
                resignation.Remarks,
                resignation.CompanyID,
                resignation.Msg,
                resignation.Type
            };
            var rowAffect = conn.Execute("INSertNoticeLettreStatus", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<ResignationLetterModel> NoticeLettregetAll(ResignationLetterModel resignation)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                resignation.GradeValue,
                resignation.CompanyID,
                resignation.Type,
                resignation.EmpCode
            };
            var dataset = conn.Query<ResignationLetterModel>("sp_NoticeLettre_List", param: peram, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }

        public static List<ResignationLetterModel> ApproveLetter()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string query = @"SELECT     dbo.NoticeLettre.ID, dbo.NoticeLettre.EmpCode, dbo.EmployeeInfo.EmpName, dbo.EmployeeInfo.Department, dbo.EmployeeInfo.Designation, 
                      dbo.NoticeLettre.Reason, dbo.NoticeLettre.CompanyID
                      FROM         dbo.NoticeLettre INNER JOIN
                      dbo.NoticeLettreStatus ON dbo.NoticeLettre.ID = dbo.NoticeLettreStatus.ResignID AND dbo.NoticeLettre.CompanyID = dbo.NoticeLettreStatus.COmpanyID INNER JOIN
                      dbo.EmployeeInfo ON dbo.NoticeLettre.EmpCode = dbo.EmployeeInfo.EmpCode AND dbo.NoticeLettre.CompanyID = dbo.EmployeeInfo.CompanyID INNER JOIN
                      dbo.EmpGeneralInfo ON dbo.EmployeeInfo.EmpCode = dbo.EmpGeneralInfo.EmpCode AND dbo.EmployeeInfo.CompanyID = dbo.EmpGeneralInfo.CompanyID AND(dbo.NoticeLettre.ApproveType = 1)";
            var dataset = conn.Query<ResignationLetterModel>(query).ToList();
            return dataset;
        }
    }
}
