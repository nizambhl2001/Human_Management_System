using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SubsistanceAllowances;

namespace WebApiCore.DbContext.SubsistanceAllowance
{
    public class SubsistanceAmountSetup
    {
        public static bool Save(SubsistanceAmountModel amount)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                amount.ID,
                amount.EmpGrade,
                amount.SalaryHead,
                amount.NumberoftimesGuilty,
                amount.NumberoftimesNonGuilty,
                amount.EDate,
                amount.Note,
                amount.CompanyID,
                amount.UserID
            };
            var rowAffect = conn.Execute("INSertsubsistenceallowanceAmountSetup",param:param,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect> 0;
        }
        public static List<SubsistanceAmountModel> GetAll(int gradevalue,int compID)
        {
            var param = new
            {
                GradeValue = gradevalue,
                CompanyID = compID
            };
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<SubsistanceAmountModel>("sp_SubsistanceAllounceAmountsetup_List", param: param, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }
        public static SubsistanceAmountModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var query = ("SELECT * FROM SubsistenceAllowanceAmountSetup WHERE ID="+id);
            var dataset = conn.QuerySingle<SubsistanceAmountModel>(query);
            return dataset;
        }
    }
}
