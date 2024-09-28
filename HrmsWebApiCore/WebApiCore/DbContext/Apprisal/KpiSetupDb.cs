using Dapper.Framework;
using HRMS.Models.SalarySetup;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Apprisal;

namespace WebApiCore.DbContext.Apprisal
{
    public class KpiSetupDb
    {
        public static List<KPISetupEntity> GetBusinessResult(string empcode, int usertypeId, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                EmpCode = empcode,
                KpiType = 1,
                UserType = usertypeId,
                CompanyID = companyId
            };

            List<KPISetupEntity> getbusinesskpi = conn.Query<KPISetupEntity>("spGetKpiDepartmentWise", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return getbusinesskpi;
        }

        public static KPISetupEntity GetKpiById(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var data = con.QuerySingle<KPISetupEntity>($"select * from KPISetup where ID={id}");
            return data;
        }

        public static bool SaveUpdateKpi(KPISetupEntity entities)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                entities.ID,
                entities.KPIName,
                entities.DepartmentId,
                entities.SerialNo,
                entities.KPIType,
                entities.CompanyID,
                entities.UserID,
                entities.Option
            };
            var rowcount = con.Execute("spSaveUpdateKPI", paramobj, commandType: CommandType.StoredProcedure);
            return rowcount > 0;
        }

        public static List<KPISetupEntity> GetPeopleResult(string empCode, int usertypeid, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var req = new
            {
                EmpCode = empCode,
                KpiType = 2,
                UserType = usertypeid,
                CompanyID = companyId
            };
            List<KPISetupEntity> result = con.Query<KPISetupEntity>("spGetKpiDepartmentWise", param: req, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }
        
        public static bool SaveUpdatePeople(KPISetupEntity entities)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                entities.ID,
                entities.KPIName,
                entities.DepartmentId,
                entities.SerialNo,
                entities.KPIType,
                entities.CompanyID,
                entities.UserID,
                entities.Option
            };
            var rowcount = con.Execute("spSaveUpdateKPI", param, commandType: CommandType.StoredProcedure);
            return rowcount > 0;
        }

        public static EmployeeForApprisal GetEmployeeInfo(int companyId, string empCode)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                CompanyID = companyId,
                EmpCode = empCode
            };
            var lst = con.QuerySingle<EmployeeForApprisal>("spGetEmpForApprisal", paramobj, commandType: CommandType.StoredProcedure);
            return lst;
        }

        public static List<SalaryYearModel>GetAllyear()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            List<SalaryYearModel> data = con.Query<SalaryYearModel>("select * from SalaryYear order by id desc").ToList();
            return data;
        }

        public static bool DeleteKpi(int id, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                ID=id,
                KPIName="",
                DepartmentId=0,
                SerialNo=0,
                KPIType=0,
                CompanyID=companyId,
                UserID=0,
                Option=3
            };
            var data = con.Execute("spSaveUpdateKPI", paramobj, commandType: CommandType.StoredProcedure);
            return data > 0;
        }

        public static List<QuarterEntity> GetQuarter(string empCode, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                EmpCode = empCode,
                CompanyID = companyId
            };
            List<QuarterEntity> data = con.Query<QuarterEntity>("spGetQuarterByEmpCode", paramobj, commandType: CommandType.StoredProcedure).ToList();
            return data;
        }
        
    }
}
