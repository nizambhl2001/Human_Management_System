using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.HR
{
    public class EmpProductionPosition
    {
        public static bool insert(EmpProductionPositionModel production)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                production.ID,
                production.EmpCode,
                production.MachineID,
                production.PositionDate,
                production.UserID,
                production.Note,
                production.CompanyID
            };
            var rowAffect = conn.Execute("INSertProdectionPosition",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<ProductionPositionViewModel> getByEmpCode(string EmpCode,int CompanyID)
        { 
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                EmpCode,
                CompanyID
            };
            var data = conn.Query<ProductionPositionViewModel>("sp_ProductionPosition_List",param:peram,commandType:System.Data.CommandType.StoredProcedure).ToList();
            return data;
        }
        public static EmpProductionPositionModel productionGetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<EmpProductionPositionModel>("SELECT * FROM EmpProductionPosition WHERE ID="+id);
            return data;
        }

    }
}
