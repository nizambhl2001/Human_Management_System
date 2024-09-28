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
    public class MachineData
    {
        public static List<MachineModel> getMachineByLineID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.Query<MachineModel>("SELECT * FROM ProductionMachine WHERE LineID=" + id).ToList();
            return data;
        }

        public static List<MachineModel> getProductionMachineList(int lineid, int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                DependID = lineid,
                CompanyID = comid
            };

            var dataList = conn.Query<MachineModel>("sp_ProductionMachine_List", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return dataList;
        }

        public static bool saveOrUpdateProductionMachine(MachineModel machineModel)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                machineModel.ID,
                machineModel.LineID,
                machineModel.Description,
                machineModel.UserID,
                machineModel.CompanyID
            };
            int rowAffected = con.Execute("INSertProdectionMachine", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        public static MachineModel getByIdProductionMachineById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM ProductionMachine WHERE ID={id}";
            MachineModel result = conn.QuerySingle<MachineModel>(quire);
            return result;
        }
    }
}
