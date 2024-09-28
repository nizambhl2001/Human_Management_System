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
    public class AgreeByBossDb
    {
        public  List<QuarterEntity> GetQuarter()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            List<QuarterEntity> data = con.Query<QuarterEntity>("select * from Quarter").ToList();
            return data;
        }

        public  List<EmpEmploymentInfoEntity> GetReportToEmp(int quarterId, int yearId, string reportTo)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                QuarterID = quarterId,
                YearID = yearId,
                ReportTo = reportTo
            };
            List<EmpEmploymentInfoEntity> getEmp = conn.Query<EmpEmploymentInfoEntity>("spGetReportToEmp", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return getEmp;
        }

        public  List<EmpEmploymentInfoEntity> GetAllReportToEmp(int quarterId, int yearId, string reportTo)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObject = new
            {
                QuarterID = quarterId,
                YearID = yearId,
                ReportTo = reportTo
            };
            List<EmpEmploymentInfoEntity> appliedEmployee = conn.Query<EmpEmploymentInfoEntity>("spGetEmpAgreeStatus", param: paramObject, commandType: CommandType.StoredProcedure).ToList();
            return appliedEmployee;
        }

        public  EmployeeForApprisal GetEmpCode(int companyId, string empCode)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                CompanyID = companyId,
                EmpCode = empCode
            };
            var lst = con.QuerySingle<EmployeeForApprisal>("sp_LeaveEntryEmployee_List", paramobj, commandType: CommandType.StoredProcedure);
            return lst;
        }

        public  bool KpiUpdateByBoss(List<KPISetupEmployeeWise> entities)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        List<KPISetupEmployeeWise> newKpi = new List<KPISetupEmployeeWise>();
                        List<string> updatedRowId = new List<string>();
                        foreach (var item in entities)
                        {
                            if (item.ID == 0)
                            {
                                item.ReportTo = KpiSetupDb.GetEmployeeInfo(item.CompanyID, item.EmpCode).ReportTo;
                                newKpi.Add(item);
                            }
                            else
                            {
                                if (item.KpiID == 0)
                                {
                                    string sql = $@"INSERT INTO KPISetup 
(KPIName, DepartmentId, SerialNo, KPIType, CompanyID, UserID, CreateDate)
        VALUES('{item.KPIName}', (SELECT DepartmentID FROM EmpEmploymentInfo WHERE EmpCode='{item.EmpCode}'),(SELECT MAX(SerialNo)+1 FROM KPISetup), {item.KPIType}, {item.CompanyID}, {item.UserID}, GETDATE()) SELECT SCOPE_IDENTITY()";
                                    int newKpiId = con.ExecuteScalar<int>(sql, transaction: tran);
                                    item.KpiID = newKpiId;
                                }
                                updatedRowId.Add(item.ID.ToString());
                                var paramobj = new
                                {
                                    item.ID,
                                    item.EmpCode,
                                    item.KPIType,
                                    item.KpiID,
                                    item.Target,
                                    item.Weight,
                                    item.CompanyID,
                                    item.YearID,
                                    item.QuarterId,
                                    item.UserID,
                                };
                                con.Execute("spUpdateByBoss", param: paramobj, transaction: tran, commandType: CommandType.StoredProcedure);
                            }
                        }
                        string deleteSql = $"DELETE EmployeeWiseKpi WHERE ID NOT IN ({string.Join(',', updatedRowId)}) AND EmpCode ='{entities.FirstOrDefault().EmpCode}' AND YearID={entities.FirstOrDefault().YearID} AND QuarterId={entities.FirstOrDefault().QuarterId} AND CompanyID={entities.FirstOrDefault().CompanyID}";
                        int rowAffect = con.Execute(deleteSql, transaction: tran);
                        tran.Commit();
                        EmpWiseKpiDb.SaveUpdateEmpWiseKpi(newKpi);
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

        public  bool AgreeByBoss(KPISetupEmployeeWise entities)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramObj = new
            {
                entities.EmpCode,
                entities.CompanyID,
                entities.YearID,
                entities.QuarterId
            };
            con.Execute("spAgreeEmployeeWise", param: paramObj, commandType: CommandType.StoredProcedure);
            return true;
        }

        public  List<KPISetupEntity> GetBusinessKpi(string empCode, int yearId, int quarterId, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                EmpCode = empCode,
                KPIType = 1,
                YearID = yearId,
                QuarterID = quarterId,
                CompanyID = companyId
            };
            List<KPISetupEntity> getBusiness = con.Query<KPISetupEntity>("spGetForAchievement", param: paramobj, commandType: CommandType.StoredProcedure).ToList();
            return getBusiness;
        }

        public  List<KPISetupEntity> GetPeopleKpi(string empCode, int yearId, int quarterId, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                EmpCode = empCode,
                KPIType = 2,
                YearID = yearId,
                QuarterID = quarterId,
                CompanyID = companyId
            };
            List<KPISetupEntity> getPeople = con.Query<KPISetupEntity>("spGetForAchievement", param: paramobj, commandType: CommandType.StoredProcedure).ToList();
            return getPeople;
        }

        public  bool SaveAchievementScore(List<KpiScoreAchievement> entites)
        {
            if (entites.Count == 0) { return false; }
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        bool isNew = entites.FindAll(c => (c.ID == null || c.ID == 0)).Count==entites.Count;
                        if (isNew)
                        {
                            string deleteExistScore = $"DELETE AchievementKPI WHERE EmpCode = '{entites.FirstOrDefault().EmpCode}' AND YearID={entites.FirstOrDefault().YearID} AND QuarterID={entites.FirstOrDefault().QuarterID}";
                            con.Execute(deleteExistScore, transaction: tran);
                        }
                        foreach (var item in entites)
                        {
                            var paramObj = new
                            {
                                item.ID,
                                item.EmpCode,
                                item.EmpKpiID,
                                item.Achievement,
                                item.Score,
                                item.Comment,
                                item.EmpComment,
                                item.YearID,
                                item.QuarterID,
                                item.CompanyID,
                                item.UserID,
                                item.IsFinal,
                                item.AchievementPerchent
                            };
                            con.Execute("spSaveUpdateScoreAchievement", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
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

        public  EmpEmploymentInfoEntity GetEmpInfo(int companyId, string empCode, int yearId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramobj = new
                {
                    CompanyID = companyId,
                    EmpCode = empCode,
                    YearId = yearId
                };
                var lst = con.Query<EmpEmploymentInfoEntity>("spGetEmpForRecommendationNew", paramobj, commandType: CommandType.StoredProcedure).ToList().FirstOrDefault();
                return lst;
            }
        }

        public  List<KpiScoreAchievement> GetEmpApprisalHistory(int companyId, string empCode, int yearId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                CompanyID = companyId,
                EmpCode = empCode,
                YearId = yearId
            };
            var lst = con.Query<KpiScoreAchievement>("spGetApprisalHistoryNew", paramobj, commandType: CommandType.StoredProcedure).ToList();
            return lst;
        }

        public  List<EmpEmploymentInfoEntity> GetAgreeStatusForRecommendation(int yearId, string reportTo)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramobj = new
            {
                YearID = yearId,
                ReportTo = reportTo
            };
            var lst = con.Query<EmpEmploymentInfoEntity>("spGetEmpAgreeStatusForRecommendation", paramobj, commandType: CommandType.StoredProcedure).ToList();
            return lst;
        }

        public  bool SaveEmpRecommendation(KpiScoreAchievement entity)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                var param = new
                {
                    entity.ID,
                    entity.EmpCode,
                    entity.YearID,
                    entity.NoofIncreament,
                    entity.PromotionType,
                    entity.RecoComments,
                    entity.CompanyID,
                    entity.UserID,
                    entity.IsApprove
                };
                var rowcount = con.Execute("spSaveUpdateRecommendation", param, commandType: CommandType.StoredProcedure);
                return rowcount > 0;
            }
        }
        
        public void ResetKpi(string empCode, int yearId, int quarterId, int companyId, int userId)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    EmpCode = empCode,
                    YearId = yearId,
                    QuarterId = quarterId,
                    CompanyId = companyId,
                    UserId = userId
                };
                con.Execute("usp_ResetKpi", param: paramObj, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
