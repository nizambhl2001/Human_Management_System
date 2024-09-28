using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;
using WebApiCore.ViewModels.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class AssaignDepartmentGL
    {
        public static bool assaignDepartmentGL(AssaignDepartmentGLViewModel glModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                glModel.ID,
                glModel.GLID,
                glModel.CompanyID
            };
           
            int result = conn.Execute("InsertGLNumber",param:obj,commandType:CommandType.StoredProcedure);
            return result > 0;
        }

        public static List<AssaignDepartmentGLViewModel> getAssignGL(int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                CompanyID = comid
            };

            List<AssaignDepartmentGLViewModel> result = conn.Query<AssaignDepartmentGLViewModel>("GetAssaimGL", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }
    }
}
