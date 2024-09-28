using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Apprisal;

namespace WebApiCore.DbContext.Apprisal
{
    public class EmpWiseKpiDb
    {
        public static object GetBusinessResult(string empCode, int yearId, int quarterId, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                EmpCode = empCode,
                KpiType = 1,
                YearID = yearId,
                QuarterID = quarterId,
                CompanyID = companyId
            };
            List<KPISetupEntity> getbusinesskpi = conn.Query<KPISetupEntity>("spgetDynamicKpi", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return getbusinesskpi;
        }

        public static object GetPeopleResult(string empCode, int yearId, int quarterId, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                EmpCode = empCode,
                KpiType = 2,
                YearID = yearId,
                QuarterID = quarterId,
                CompanyID = companyId
            };
            List<KPISetupEntity> getbusinesskpi = conn.Query<KPISetupEntity>("spgetDynamicKpi", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return getbusinesskpi;
        }

        public static bool SaveUpdateEmpWiseKpi(List<KPISetupEmployeeWise> entities)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    if (entities.Count == 0) { return true; ; }
                    try
                    {
                        string deleteExistKpi = $"DELETE EmployeeWiseKpi WHERE EmpCode={entities[0].EmpCode} AND CompanyID={entities[0].CompanyID} AND QuarterId={entities[0].QuarterId} AND YearID={entities[0].YearID}";
                        int rowAffeect = con.Execute(deleteExistKpi, transaction: tran);
                        foreach (var item in entities)
                        {
                            if (item.KpiID == 0)
                            {
                                string sql = $@"INSERT INTO KPISetup 
(KPIName, DepartmentId, SerialNo, KPIType, CompanyID, UserID, CreateDate)
        VALUES('{item.KPIName}', (SELECT DepartmentID FROM EmpEmploymentInfo WHERE EmpCode='{item.EmpCode}'),(SELECT MAX(SerialNo)+1 FROM KPISetup), {item.KPIType}, {item.CompanyID}, {item.UserID}, GETDATE()) SELECT SCOPE_IDENTITY()";
                                int newKpiId = con.ExecuteScalar<int>(sql, transaction: tran);
                                item.KpiID = newKpiId;
                            }
                            var paramObj = new
                            {
                                item.ID,
                                item.EmpCode,
                                item.QuarterId,
                                item.KpiID,
                                item.KPIType,
                                item.Target,
                                item.Weight,
                                item.CompanyID,
                                item.UserID,
                                item.IsAgree,
                                item.YearID,
                                item.ReportTo
                            };
                            con.Execute("spSaveUpdateEmployeeWise", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                        }
                        tran.Commit();
                        return true;

                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }

                }
            }
        }

        public static bool UpdateEmpWiseKpiForAgree(KPISetupEmployeeWise entities)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                entities.EmpCode,
                entities.CompanyID,
                entities.YearID,
                entities.QuarterId
            };
             conn.Execute("spEmployeeAgree", param: paramObject, commandType: CommandType.StoredProcedure);
            return true;
        }

        public static bool UpdateKpiScoreByBoss(List<KpiScoreAchievement> entities)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in entities)
                        {
                            var paramObj = new
                            {
                                item.ID,
                                item.Achievement,
                                item.Score,
                                item.Comment,
                                item.ManComment,
                                item.YearID,
                                item.QuarterID,
                                item.CompanyID,
                                item.IsFinal,
                                item.AchievementPerchent,
                                item.NoOfIncrement,
                                item.IsPromotion,
                                item.TIT
                            };
                            con.Execute("spUpdateScoreAchievementByBoss", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                        }
                        tran.Commit();
                        return true;

                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }

                }
            }
        }
    }
}
