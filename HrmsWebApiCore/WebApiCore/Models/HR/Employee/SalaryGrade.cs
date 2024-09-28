using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.Models.HR.Employee
{
    public class SalaryGrade
    {
        public static List<SalaryGradeModel> getAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<SalaryGradeModel>("SELECT * FROM PayScale").ToList();
            return dataset;
        }
    }
}