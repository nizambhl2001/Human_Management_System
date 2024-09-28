using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.ViewModels.HR;
using WebApiCore.ViewModels.HR.Employee;
using static Dapper.Framework.SqlMapper;

namespace WebApiCore.Controllers.HR
{
    public class PersonalFile
    {
        public static List<object> getAllFlipBookInfo(string empCode)
        {
            List<object> dataList = new List<object>();
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                empCode
            };
            var results = conn.QueryMultiple("usp_FlipBook_All",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            dataList.Add(results.ReadFirstOrDefault<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            dataList.Add(results.Read<object>());
            return dataList;
        } 
    }
}
