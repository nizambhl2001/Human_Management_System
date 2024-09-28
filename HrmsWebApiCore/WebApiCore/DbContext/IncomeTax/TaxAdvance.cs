using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class TaxAdvance
    {
        public static bool saveTaxAdvance(TaxAdvanceModel advanceModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                advanceModel.EmpCode,
                advanceModel.TaxYear,
                advanceModel.Amount,
                advanceModel.Note,
                advanceModel.UserID,
                advanceModel.CompanyID,

            };
            int rowAffectted = conn.Execute("INSertTaxAdvanceInfo", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffectted > 0;
        }
    }
}
