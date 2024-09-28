using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Security;

namespace WebApiCore.DbContext.SystemSetup
{
    public class Company
    {
        public static List<CompanyModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<CompanyModel>("SELECT * FROM CompanyInfo").ToList();
            return dataset;
        }

        public static CompanyModel Get(int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var company = conn.Query<CompanyModel>($"SELECT * FROM CompanyInfo WHERE ID={companyId}").ToList().FirstOrDefault();
            return company;
        }
    }
}
