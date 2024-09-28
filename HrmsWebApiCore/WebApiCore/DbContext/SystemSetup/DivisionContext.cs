using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class DivisionContext
    {

        public static List<DivisionModel> getDivisionList()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM ContactDivision";

            List<DivisionModel> result = conn.Query<DivisionModel>(quire).ToList();
            return result;

        }


        public static bool saveDivision(DivisionModel divisionModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO ContactDivision (DivisionName) VALUES ('{divisionModel.DivisionName}')";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool updateDivision(DivisionModel divisionModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPDATE ContactDivision SET DivisionName='{divisionModel.DivisionName}' WHERE DivisionID={divisionModel.DivisionID}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool deleteDivision(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE ContactDivision WHERE DivisionID={id}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static DivisionModel getByid(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM ContactDivision WHERE DivisionID={id}";
            DivisionModel result = conn.QuerySingle<DivisionModel>(quire);
            return result;
        }
    }
}
