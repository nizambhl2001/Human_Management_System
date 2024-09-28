using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.HR;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
  public class AdditionalDuties
  {
    public static bool SaveUpdate(EmpAdditionalDutyModel adm)
    {
      var conn = new SqlConnection(Connection.ConnectionString());
      var param = new
      {
        adm.ID,
        adm.EmpCode,
        adm.PayType,
        adm.Department,
        adm.Designation,
        adm.SchoolorOffice,
        adm.Responsibilities,
        adm.NoticeIssuedDate,
        adm.EffFromDate,
        adm.EffToDate,
        adm.Duration,
        adm.Amount,
        adm.Remark,
        adm.CompanyID,
        adm.UserID,
        adm.pOptions
      };
      int rowAffect = conn.Execute("sp_AdditionalDuties_New", param: param, commandType: CommandType.StoredProcedure);
      return rowAffect > 0;
    }

    public static bool Delete(int pOption)
    {
      var conn = new SqlConnection(Connection.ConnectionString());
      int rowaffect = conn.Execute("sp_AdditionalDuties_New", commandType: CommandType.StoredProcedure);
      return rowaffect > 0;
    }

    public static List<EmpAdditionalDutyModel> GetAll()
    {
      var conn=new SqlConnection(Connection.ConnectionString());
      var dataset = conn.Query<EmpAdditionalDutyModel>("SELECT * FROM AdditionalDuties").ToList();
      return dataset;
    }
    public static EmpAdditionalDutyModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var catagory = conn.QuerySingle<EmpAdditionalDutyModel>("SELECT * FROM AdditionalDuties WHERE ID=" + id);
            return catagory;
        }
    }
}
