using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class ExitInterView
    {
        public static bool SaveExitInterview(ExitInterviewModel interviewModel)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var reason in interviewModel.LeavingReason)
                        {
                            var obj = new
                            {
                                interviewModel.ID,
                                interviewModel.EmpCode,
                                LeavingID = reason.LeavingReasonID,
                                reason.ReasonPerchentage,
                                interviewModel.InterViewer,
                                interviewModel.DateOfInterview,
                                interviewModel.OutOfPayroll
                            };
                            con.Execute("spSaveExitInterview", param: obj, transaction: tran, commandType: System.Data.CommandType.StoredProcedure);
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
        }
    }
}
