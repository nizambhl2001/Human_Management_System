using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalarySetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class Line
    {
        public static List<LineModel> getLineByFloreId(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataList = conn.Query<LineModel>("SELECT * FROM ProductionLine WHERE FloreID="+id).ToList();
            return dataList;
        }

        public static List<FloreModel> getFloreList(int unitId, int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                DependID=unitId,
                CompanyID=comid
            }; 
             var dataList = conn.Query<FloreModel>("sp_ProductionFloor_List",param:obj,commandType:CommandType.StoredProcedure).ToList();
            return dataList;
        }

        public static List<LineModel> getProductionLineList(int floreId, int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                DependID = floreId,
                CompanyID = comid
            };
            
            var dataList = conn.Query<LineModel>("sp_ProductionLine_List", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return dataList;
        }

        public static LineModel getByIdProductionLine(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM ProductionLine WHERE ID={id}";
            LineModel result = conn.QuerySingle<LineModel>(quire);
            return result;
        }

        public static bool saveOrUpdateProductionLine(LineModel lineModel)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                lineModel.ID,
                lineModel.FloreID,
                lineModel.Description,
                lineModel.UserID,
                lineModel.CompanyID
            };
            int rowAffected = con.Execute("INSertProdectionLine", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        
    }
}
