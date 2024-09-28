using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalarySetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class Flore
    {
        public static List<FloreModel> GetFlore()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.Query<FloreModel>("select * from ProductionFlore").ToList();
            return (data);
        }
        public static List<FloreModel> getFloreByID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.Query<FloreModel>("SELECT * FROM ProductionFlore WHERE ProductionUniteID=" + id).ToList();
            return data;
        }

        public static bool saveOrUpdateFlore(FloreModel floreModel)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                floreModel.ID,
                floreModel.ProductionUniteID,
                floreModel.Description,
                floreModel.UserID,
                floreModel.CompanyID
            };
            int rowAffected = con.Execute("INSertProdectionFloor", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }
        
        public static FloreModel getByFloreId (int id) {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.QuerySingle<FloreModel>("SELECT * FROM ProductionFlore WHERE ID=" + id);
            return data;
        }
    }
}
