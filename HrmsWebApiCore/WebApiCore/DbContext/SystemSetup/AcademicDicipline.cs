using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class AcademicDicipline
    {
        public static List<BasicEntryModel> getAcademicList()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM EducationGroup";

            List<BasicEntryModel> result = conn.Query<BasicEntryModel>(quire).ToList();
            return result;

        }


        public static bool saveAcademicDis(BasicEntryModel entryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO EducationGroup (Description,Code,CompanyID) VALUES ('{entryModel.Description}','{entryModel.Code}',{entryModel.CompanyID})";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool updateAcademicDis(BasicEntryModel entryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPDATE EducationGroup SET Description='{entryModel.Description}',Code='{entryModel.Code}' WHERE ID={entryModel.ID}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool deleteAcademicDis(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE EducationGroup WHERE ID={id}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static BasicEntryModel getByid(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM EducationGroup WHERE ID={id}";
            BasicEntryModel result = conn.QuerySingle<BasicEntryModel>(quire);
            return result;
        }
    }
}
