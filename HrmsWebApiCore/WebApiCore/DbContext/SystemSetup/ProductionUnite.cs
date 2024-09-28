using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class ProductionUnite
    {
        public static bool saveOrUpdateProUnit (BasicEntryModel basicEntryModel){
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                basicEntryModel.ID,
                basicEntryModel.Description,
                basicEntryModel.UserID,
                basicEntryModel.CompanyID
            };
            int rowAffected = conn.Execute("INSertProdectionUnite",param:obj,commandType:CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        public static BasicEntryModel getByIdProductionUnit(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM ProductionUnite WHERE ID={id}";
            BasicEntryModel result = conn.QuerySingle<BasicEntryModel>(quire);
            return result;
        }


    }
}
