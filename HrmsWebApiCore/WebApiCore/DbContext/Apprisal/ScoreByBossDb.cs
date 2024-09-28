using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.Apprisal;

namespace WebApiCore.DbContext.Apprisal
{
    public class ScoreByBossDb
    {
        public List<EmpEmploymentInfoEntity> GetEmpScoreAchievement(int quarterId, int yearId, string reportTo)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                QuarterID = quarterId,
                YearID = yearId,
                ReportTo=reportTo
            };
            List<EmpEmploymentInfoEntity> getScore = conn.Query<EmpEmploymentInfoEntity>("spGetApprisalStatus", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return getScore;
        }

        public EmpEmploymentInfoEntity GetPresentAvarage(int yearId, string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var query = "SELECT AVG(AchievmentPercnt) FROM AchievementKPI WHERE EmpCode = '" + empCode + "' and YearID = "+yearId;
            var data = conn.QuerySingle<EmpEmploymentInfoEntity>(query);
                return data;
        }
        public List<EmpEmploymentInfoEntity> GetAllEmpScoreAchievement(int quarterId, int yearId, string reportTo)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                QuarterID = quarterId,
                YearID = yearId,
                EmpCode = reportTo
            };
            List<EmpEmploymentInfoEntity> scoredEmp = conn.Query<EmpEmploymentInfoEntity>("spGetApprisalStatusBYReportTo", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            var reportingEmp = Employee.GetEmpByBoss(reportTo);
            var allEmpScore = reportingEmp
                .GroupJoin(scoredEmp, re => re.EmpCode, se => se.EmpCode, (re, se) => new { re, se })
                .SelectMany(@t => t.se.DefaultIfEmpty(), (@t, s) => new { @t, s })
                .Select(@t => new EmpEmploymentInfoEntity
                {
                    EmpCode = t.t.re.EmpCode,
                    EmpName = t.t.re.EmpName,
                    Employee = t.s == null ? "---" : t.s.Employee,
                    Boss = t.s == null ? "---" : t.s.Boss,
                    Apprisal = t.s ==null ? "---" : t.s.Apprisal
                }).ToList();
            return allEmpScore;
        }
        public void ResetAppriasal(string empCode, int yearId, int quarterId, int companyId, int userId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    EmpCode = empCode,
                    YearId = yearId,
                    QuarterId = quarterId,
                    CompanyId = companyId,
                    UserId = userId
                };
                con.Execute("usp_ResetAppriasal", param: paramObj, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
