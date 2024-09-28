using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.DbContext.Security;
using WebApiCore.Models.HR;
using WebApiCore.Models.Security;
using WebApiCore.ViewModels.HR;

namespace WebApiCore.DbContext.HR
{
    public class Employment
    {
        public static EmploymentViewModel GetEmployment(string empCode, int companyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.QuerySingle<EmploymentViewModel>("SELECT * FROM view_employment_info WHERE EmpCode='" + empCode + "' AND CompanyID=" + companyID);
            return dateset;
        }

        public static bool SaveUpdate(EmploymentModel employment)
        {
            using (var conn = new SqlConnection(Connection.ConnectionString()))
            {
                conn.Open();
                using (var tran = conn.BeginTransaction())
                {
                    try
                    {
                        var paramObj = new DynamicParameters();
                        paramObj.Add("EmpCode", employment.EmpCode);
                        paramObj.Add("CompanyID", employment.CompanyID);
                        paramObj.Add("BusinessNatureID", employment.BusinessNatureID);
                        paramObj.Add("DesignationID", employment.DesignationID);
                        paramObj.Add("JoinDate", employment.JoinDate);
                        paramObj.Add("JobType", employment.JobType);
                        paramObj.Add("EmpGradeID", employment.EmpGradeID);
                        paramObj.Add("JobDescription", employment.JobDescription);
                        paramObj.Add("JobLocation", employment.JobLocation);
                        paramObj.Add("ProjectID", employment.ProjectID);
                        paramObj.Add("DepartmentID", employment.DepartmentID);
                        paramObj.Add("ConfirmationDate", employment.ConfirmationDate);
                        paramObj.Add("ConfirmationDueDate", employment.ConfirmationDueDate);
                        paramObj.Add("CardNo", employment.CardNo);
                        paramObj.Add("Experience", employment.Experience);
                        paramObj.Add("Location", employment.Location);
                        paramObj.Add("Unit", employment.Unit);
                        paramObj.Add("ReportTo", employment.ReportTo);
                        paramObj.Add("RecommendTo", employment.RecommendTo);
                        paramObj.Add("OT", employment.OT);

                        int rowAffect;
                        if (employment.ID > 0)
                        {
                            rowAffect = conn.Execute("sp_EmploymentInfo_Update", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                        }
                        else
                        {
                            paramObj.Add("Resident", employment.Resident);
                            paramObj.Add("IsComCar", employment.IsComCar);
                            paramObj.Add("Status", employment.Status);
                            rowAffect = conn.Execute("sp_EmploymentInfo_Insert", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            //New user will be create by sp

                            //var user = new UserModel();
                            //user.CompanyID = employment.CompanyID;
                            //user.EmpCode = employment.EmpCode;
                            //user.UserName = employment.EmpName;
                            //user.LoginID = employment.EmpCode;
                            //user.LoginPassword = employment.EmpCode;
                            //user.UserTypeID = employment.UserTypeId;
                            //user.CreatedByID = 0;
                            //user.CreatedDate = DateTime.Now.ToShortDateString();
                            //user.IsChangePassword = "No";
                            //user.IsActive = "Yes";
                            //user.GradeValue = employment.EmpGradeID;
                            //user.Salarytype=0;
                            //UserDb.SaveCreateUser(user,conn,tran);
                        }

                        tran.Commit();
                        return rowAffect > 0;
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }

        }

        public static List<EmploymentModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<EmploymentModel>("SELECT * FROM EmploymentInfo").ToList();
            return dataset;
        }

        public static EmploymentModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<EmploymentModel>("SELECT * FROM EmploymentInfo WHERE ID=" + id);
            return dataset;
        }

        public static bool DeleteById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var rowAffect = conn.Execute("DELETE EmploymentInfo WHERE ID+" + id);
            return rowAffect > 0;

        }
        public static List<EmpSearchViewModel> GetAllEmpBasicInfo(int compId, int gradeValue)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
               
                var employees = con.Query<EmpSearchViewModel>("sp_EmpGeneralInfoWithAmount",param:new { CompanyID =compId},commandType:CommandType.StoredProcedure).ToList();
                return employees;
            }
        }

        public static List<EmpSearchViewModel> getAllEmpBasicInfoByuserType(int compId, int gradeValue, int userId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {

                var employees = con.Query<EmpSearchViewModel>("sp_EmpGeneralInfoByuserType", param: new { CompanyID = compId, UserId = userId }, commandType: CommandType.StoredProcedure).ToList();
                return employees;
            }
        }
        public static List<EmpSearchViewModel> GetAllEmpBasicInfoForLeave(int compId, int gradeValue)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $@"SELECT EmpCode, EmpName, Department, DepartmentID, Designation, DesignationID,JobLocation, GradeValue, JoinDate, CompanyID FROM view_employment_info
             WHERE  CompanyID = { compId} AND Status='Active' AND Active=1";
                var employees = con.Query<EmpSearchViewModel>(sql).ToList();
                return employees;
            }
        }
        public static List<EmpSearchViewModel> GetReportToEmployee(int compId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $@"SELECT EmpCode, EmpName FROM view_employment_info
          WHERE   CompanyID = {compId} AND Status='Active' AND IsBlock='No' AND Active=1";
                var employees = con.Query<EmpSearchViewModel>(sql).ToList();
                return employees;
            }
        }

        public static List<T> GetEmployee<T>(int companyId, int departmentId = -1, int locationId = -1)
        {
            string selectSql = $@"SELECT EmpCode, EmpName, Department, Designation, CompanyID 
FROM view_employment_info 
WHERE (DepartmentID = CASE WHEN {departmentId}>0 THEN {departmentId} ELSE DepartmentID END)
AND (Location = CASE WHEN {locationId}>0 THEN {locationId} ELSE Location END) AND CompanyID={companyId}";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var employees = con.Query<T>(selectSql).ToList();
                return employees;
            }
        }
        /// <summary>
        /// Get Ot Entitled Employee
        /// </summary>
        /// <param name="bossId">ReportTo Employee Code</param>
        /// <returns></returns>
        public static List<EmpSearchViewModel> GetOtEntitledEmployeeByBoss(string bossId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string selectSql = $@"SELECT ve.EmpCode,ve.EmpName,ve.Department,ve.Designation,eei.ReportTo, eei.OT AS IsEntitledOt 
FROM View_EmployeeAll ve JOIN EmpEmploymentInfo eei ON eei.EmpCode=ve.EmpCode
WHERE eei.OT='Yes' AND COALESCE(eei.ReportTo,'')='{bossId}'";
                var employees = con.Query<EmpSearchViewModel>(selectSql).ToList();
                return employees;
            }
        }
        public static bool SaveUpdateJobDescription(JobDescriptionModel jobDescription)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                if(jobDescription.ID !=0)
                {
                    jobDescription.pOptions = 2;
                }
                var peram = new
                {
                    jobDescription.ID,
                    jobDescription.CompanyID,
                    jobDescription.Description,
                    jobDescription.EmpCode,
                    jobDescription.Msg,
                    jobDescription.pOptions,
                    jobDescription.Status,
                    jobDescription.JobAssignDate
                };
                var rowAffect = con.Execute("sp_EmpJobDescription", param: peram, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }


        public static List<EmpSearchViewModel> GetuserInfo(int compId, string loginID)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var peram = new
                {
                    compId,
                    loginID,
                };
                List<EmpSearchViewModel> rowAffect = con.Query<EmpSearchViewModel>("about_GetuserInfo", param: peram, commandType: CommandType.StoredProcedure).ToList();
                return rowAffect;
            }
        }



        public static List<JobDescriptionModel> getJobDescriptionByEmpCode(string empCode, int compId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var Query = $"SELECT * FROM tblJobDescription WHERE EmpCode='" + empCode + "' AND CompanyID=" + compId;
                var jobDescription = con.Query<JobDescriptionModel>(Query).ToList();
                return jobDescription;
            }
        }
        public static JobDescriptionModel getJobDescriptionById(int Id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var Query = $"SELECT * FROM tblJobDescription WHERE ID=" + Id;
                var jobDescription = con.QuerySingle<JobDescriptionModel>(Query);
                return jobDescription;
            }
        }


    }
}

