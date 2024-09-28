using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Property;

namespace WebApiCore.DbContext.Property
{
    public class TaxAssain
    {
        public static bool Saveupdate(TaxAssainModel vehicle)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
                {
                vehicle.EmpCode,
                vehicle.AssainDate,
                vehicle.Type,
                vehicle.Active,
                vehicle.CompanyID
            };
            int rowAffect = conn.Execute("INSertCarhouseAssain", param: param,
                commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        public static List<TaxAssainModel> getAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.Query<TaxAssainModel>("SELECT * FROM CarhouseAssain").ToList();
            return dateset;
        }

        public static TaxAssainModel GetById(string empCode,int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<TaxAssainModel>("SELECT CompanyID,EmpCode, EmpName, Department, Designation, JoiningDate  FROM View_EmployeeAll WHERE EmpCode='" + empCode + "' And CompanyID=" + companyId);
            try
            {
                var param = new
                {
                    EmpCode = empCode,
                    CompanyId = companyId
                };
                var vehicle = conn.QuerySingle<TaxAssainModel>("sp_get_carhouse_tax", param: param, commandType: CommandType.StoredProcedure);
                   data.Active = vehicle.Active;
                   data.AssainDate = vehicle.AssainDate;
                   data.Type = vehicle.Type;
            }
            catch (Exception)
            {
               
            }
           
            return data;
        }

        public static bool delete(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var rowAffect = conn.Execute("DELETE FROM CarhouseAssain WHERE ID="+id);
            return rowAffect > 0;
        }

    }
}
