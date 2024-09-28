using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.SalarySetup;

namespace HRMS.DbContext.SalarySetup
{
    public class PayscaleGradeDb
    {
        public static List<PayscaleModel> getAllPayscale(int companyId, int spNo)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    CompanyID = companyId,
                    SpNo = 4
                };
                List<PayscaleModel> payscale = con.Query<PayscaleModel>("sp_Payscale", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return payscale;
            }
        }

        public static bool SaveUpdate(PayscaleModel payscale,int spNo)
        {
            var con=new SqlConnection(Connection.ConnectionString());
            var paramObj = new
            {
                payscale.ID,
                payscale.PayScale,
                SalaryGradeID= payscale.SalaryGradeID="1",
                payscale.CompanyID,
                SpNo=spNo,
                payscale.Msg


            };
          
            int rowAffect = con.Execute("sp_Payscale", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            
            
        }

        public static PayscaleModel getpayscaleId(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                PayscaleModel payscale = con.QuerySingle<PayscaleModel>("select * from Payscale where ID=" + id);
                return payscale;
            }
        }
    }
}