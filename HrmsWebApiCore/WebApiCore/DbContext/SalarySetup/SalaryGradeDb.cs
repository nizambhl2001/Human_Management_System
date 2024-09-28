using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.SalarySetup;
using WebApiCore.Models.SystemSetup;

namespace HRMS.DbContext.SalarySetup
{
    public class SalaryGradeDb
    {
        public static List<SalGradeModel> GetSalaryGrade()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.Query<SalGradeModel>("select * from StructureType").ToList();
            return (data);
        }

        public static SalGradeModel getSalGradeById(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                SalGradeModel salgrade = con.QuerySingle<SalGradeModel>("select * from StructureType where ID=" + id);
                return salgrade;
            }
        }

        public static bool SaveSalaryGrade(SalGradeModel salgrade)
        {
            string sql = "Insert into StructureType(StructureName ,SortOrder  ,CompanyID  )values('" + salgrade.StructureName + "'," + salgrade.SortOrder + "," +salgrade.CompanyID + ")";


            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(sql);
                return rowAffected > 0;
            }
        }

        public static bool UpdateSalaryGrade(SalGradeModel salgrade)
        {
            string sql = "update StructureType set StructureName='" +salgrade.StructureName + "', SortOrder="+salgrade.SortOrder+", CompanyID=" + salgrade.CompanyID + " where ID="+salgrade.ID+"";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(sql);
                return rowAffected > 0;
            }
        }


    }
}