using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncentiveOther;

namespace WebApiCore.DbContext.IncentiveOther
{
    public class ArrearPaytmentAuto
    {
        public static bool Save(ArrearpaymentAutoModel arrear)
        {
            try
            {
                var conn = new SqlConnection(Connection.ConnectionString());
                
                var peram = new
                {
                    arrear.StartPeriod,
                    arrear.ComparePeriod,
                    arrear.ArrearPeriod,
                    arrear.ArrearDate,
                    arrear.IncrementDate,
                    arrear.CompantID,
                    arrear.BonusTYpe,
                    arrear.grade,
                    EmpCode=arrear.EmpCode??"-1"
                };
                var rowAffect = conn.Execute("spProcessEmpArrear", param: peram, commandType: System.Data.CommandType.StoredProcedure);
                return true;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }
}
