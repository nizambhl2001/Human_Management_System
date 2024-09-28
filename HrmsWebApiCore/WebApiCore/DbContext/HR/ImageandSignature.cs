using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class ImageandSignature
    {
        public static List<ImageAndSignatureModel> getByEmpCode(string EmpCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<ImageAndSignatureModel>($"SELECT Picture,Signature FROM EmpGeneralInfo WHere EmpCode='{EmpCode}'").ToList();
            return data;
        }
    }
}
