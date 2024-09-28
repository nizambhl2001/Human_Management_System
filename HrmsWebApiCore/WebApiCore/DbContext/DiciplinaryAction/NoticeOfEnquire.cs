using Dapper.Framework;
using HRMS.Models.DiciplinaryAction;
using HRMS.ViewModels.DisciplinaryAction;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HRMS.DbContext.DiciplinaryAction
{
    public class NoticeOfEnquire
    {
        public static bool SaveUpdateNoticeEnquire(NoticeEnquireModel noticeEnquire)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            int noticeId = Convert.ToInt32(con.ExecuteScalar("SELECT MAX(NoticeID)+1 FROM NoticeEnquiry"));
            con.Open();
            using (var tran = con.BeginTransaction())
            {
                try
                {
                   
                    foreach (var enqEmp in noticeEnquire.EnquireCommitty)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = "sp_NoticeOfEnquiry";
                            cmd.Connection = con;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@ID", noticeEnquire.ID);
                            cmd.Parameters.AddWithValue("@NoticeID", noticeId);
                            cmd.Parameters.AddWithValue("@EmpCode", noticeEnquire.EmpCode);
                            cmd.Parameters.AddWithValue("@DateOfEnquiry", noticeEnquire.DateOfEnquiry);
                            cmd.Parameters.AddWithValue("@DateOfNoticeIssue", noticeEnquire.DateOfNoticeIssue);
                            cmd.Parameters.AddWithValue("@EnqEmpCode", noticeEnquire.EnqEmpCode);
                            cmd.Parameters.AddWithValue("@EmpNote", noticeEnquire.EmpNote);
                            cmd.Parameters.AddWithValue("@Venue", noticeEnquire.Venue);
                            cmd.Parameters.AddWithValue("@Note", noticeEnquire.Note);
                            cmd.Parameters.AddWithValue("@UserID", noticeEnquire.UserID);
                            cmd.Parameters.AddWithValue("@CompanyID", noticeEnquire.CompanyID);
                            cmd.ExecuteNonQuery();
                        }
                       
                    }
                    tran.Commit();
                    return true;
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw new Exception(err.Message);
                }
            }
        }






        public static List<NoticeEnquireViewModel> GetAllNoticeEnquireList(string empCode, int gradeValue, int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());

            var paramobj = new
            {
                EmpCode = empCode,
                GradeValue = gradeValue,
                CompanyID = comId
            };
            List<NoticeEnquireViewModel> NoticeEnquireList = conn.Query<NoticeEnquireViewModel>("sp_NoticeEnquiry_List", param: paramobj, commandType: CommandType.StoredProcedure).ToList();
            return NoticeEnquireList;
        }

        public static NoticeEnquireModel getById(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var sql = "SELECT TOP 1 * FROM NoticeEnquiry WHERE NoticeID=" + id;
                var notice = con.QuerySingle<NoticeEnquireModel>(sql);

                string selectEnqireCommitee = @"SELECT EnqEmpCode AS EmpCode,emp.EmpName, emp.Department, emp.Designation, EmpNote
                        FROM NoticeEnquiry AS enq
                        JOIN EmployeeInfo as emp ON emp.EmpCode = enq.EmpCode
                        WHERE enq.NoticeID = " + id;

                var enqCommitee = con.Query<EnquireCommittyModel>(selectEnqireCommitee).ToList();

                notice.EnquireCommitty = enqCommitee;

                return notice;
            }

        }

    }
}