using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
  public class EmpType
  {
    public static List<EmpTypeModel> GetAll()
    {
      var conn = new SqlConnection(Connection.ConnectionString());
      var dataset = conn.Query<EmpTypeModel>("SELECT * FROM EmpGrade").ToList();
      return dataset;
    }
  }
}
