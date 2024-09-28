using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class Transfertype
    {
        public static List<BasicEntryModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<BasicEntryModel>("SELECT * FROM EmpTransferType").ToList();
            return dataset;
        }
    }
}