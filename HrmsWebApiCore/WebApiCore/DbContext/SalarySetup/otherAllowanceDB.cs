using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.SalarySetup;
using WebApiCore.ViewModels.SalarySetup;

namespace WebApiCore.DbContext.SalarySetup
{
    public class OtherAllowanceDB
    {
        public static List<OtherAllowance> getAll(string gradeName)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            List<OtherAllowance> otherallwnce =
                con.Query<OtherAllowance>(
                        $"select ID,GradeValue,CompanyID,GradeName +'-'+ Cast(GradeSerial as nvarchar)as GradeValue from SalaryGrade where  GradeName='{gradeName}'")
                    .ToList();
            return otherallwnce;
        }

        public static bool save(OtherAllowanceModel otherAllowance)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        if (otherAllowance.PayscaleDeails != null)
                        {
                            foreach (var gradevalues in otherAllowance.PayscaleDeails)
                            {
                                string sql =
                                $"Insert into OtherAllowlance (PayscaleID,SalaryHeadID,Amount,SortOrder,CompanyID) values('{gradevalues.PayscaleID}','{otherAllowance.SalaryHeadID}','{gradevalues.Amount}','{otherAllowance.SortOrder}','{otherAllowance.CompanyID}')";
                                 con.Execute(sql, transaction: tran);

                            }
                        }

                        tran.Commit();
                        return true;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw new Exception(e.Message);
                    }
                }
            }
        }




    }
}
