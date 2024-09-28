using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.DbContext.IncomeTax
{
    public static class TaxAdjust
    {

        public static bool saveTaxAdjust(int taxYearId,int userTypeId,int comId,int gradeid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int Grade;
            if (userTypeId != 1 && userTypeId != 4)
            {
                Grade = gradeid;
            }

            else
            {
                Grade = -1;
            }


            var obj = new
            {
                Taxyear=taxYearId,
                CompanyID=comId,
                Grade=Grade
            };
             conn.Execute("spProcessEmpTAXAdjust", param: obj, commandType: CommandType.StoredProcedure);
            return true;
        }
    }
}
