using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class SalaryPublish
    {
        public static List<SalaryPublishModel>getPublishList(int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                CompanyID = comId
            };

            List<SalaryPublishModel> resutl = conn.Query<SalaryPublishModel>("GetPublishSalaryList",param:obj,commandType:CommandType.StoredProcedure).ToList();
            return resutl;
        }

        public static SalaryPublishModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM SalaryPublish WHERE ID={id}";
           var result= conn.QuerySingle<SalaryPublishModel>(quire);
            return result;
        }

        public static bool saveOrUpdate(SalaryPublishModel publishModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {   
                publishModel.ID,
                publishModel.PeriodID,
                publishModel.Publish,
                publishModel.CompanyID
            };

            int rowAffected = conn.Execute("INSertSalaryPublish", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }
    }
}
