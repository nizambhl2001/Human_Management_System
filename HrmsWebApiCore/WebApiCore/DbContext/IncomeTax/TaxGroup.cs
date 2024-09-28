using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class TaxGroup
    {
        public static List<TaxGroupModel> getAllTaxGroup()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM TaxGroup";
            List<TaxGroupModel> taxGroupModels = conn.Query<TaxGroupModel>(quire).ToList();
            return taxGroupModels;
        }
    }
}
