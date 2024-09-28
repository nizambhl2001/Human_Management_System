using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using WebApiCore.DbContext.Attendance;
using WebApiCore.DbContext.HR;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.Models.OverTime;
using WebApiCore.ViewModels.HR;
using WebApiCore.ViewModels.Overtime;

namespace HRMS.DbContext.OverTime
{
    public class OverTimeDb
    {
        private List<EmpSearchViewModel> _otEntitledEmployee = new List<EmpSearchViewModel>();
        
        //------Ot Requisition
        /// <summary>
        /// Get Ot Entitled Employee
        /// </summary>
        /// <param name="bossId">ReportTo Employee Code</param>
        /// <returns></returns>
        public List<EmpSearchViewModel> GetOtEntitledEmployeeByBoss(string bossId)
        {
            var employees = Employment.GetOtEntitledEmployeeByBoss(bossId);
            foreach (var emp in employees)
            {
                _otEntitledEmployee.Add(emp);
                if (Employment.GetOtEntitledEmployeeByBoss(emp.EmpCode).Any())
                {
                    GetOtEntitledEmployeeByBoss(emp.EmpCode);
                }
            }
            return _otEntitledEmployee;
        }
        public static bool RequisitionApply(OtRequisitionModel otRequisition)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        var objMaster = new
                        {
                            otRequisition.ID,
                            otRequisition.UserID,
                            otRequisition.RequisitionDate,
                            otRequisition.ReasonOfOt,
                            otRequisition.SectionID,
                            otRequisition.FromDate,
                            otRequisition.ToDate,
                            otRequisition.IsApprove,
                            otRequisition.ApprovedBy,
                            otRequisition.ApprovedDate,
                            otRequisition.IsEditByBoss,
                            otRequisition.CompanyID
                        };
                        int requisitionMasterId = con.ExecuteScalar<int>("spInsertUpdateOtRequisition", param: objMaster, transaction: tran, commandType: CommandType.StoredProcedure);

                        foreach (var ord in otRequisition.OtRequisitionDetails)
                        {
                            var paramObj = new
                            {
                                OtRequisitionMasterID = requisitionMasterId,
                                ord.EmpCode,
                                ord.OtDate,
                                ord.OtHours,
                                ord.IsReplace,
                                ord.ApprovedHours
                            };
                            int rowAffect = con.Execute("spInsertUpdateOtRequisitionDetails", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
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
        public static List<OtRequisitionModel> GetOtRequisition()
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = @"SELECT om.ID, om.UserID,om.RequisitionDate,om.SectionID,bn.Description AS Section,om.ReasonOfOt,om.FromDate,om.ToDate,om.IsApprove,om.ApprovedDate,om.ApprovedBy,om.IsEditByBoss,om.CompanyID 
FROM OtRequisitionMaster om JOIN BusinessNature bn ON bn.ID=om.SectionID";
                List<OtRequisitionModel> requisitions = con.Query<OtRequisitionModel>(sql).OrderByDescending(c => c.RequisitionDate).ToList();
                return requisitions;
            }
        }
        public static OtRequisitionModel GetOtRequisitionDetails(int otRequisitionMasterId)
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                string selectOtApplication = $"SELECT om.ID, om.UserID,om.RequisitionDate,om.SectionID,bn.Description AS Section,om.ReasonOfOt,om.FromDate,om.ToDate,om.IsApprove,om.ApprovedDate,om.ApprovedBy,om.IsEditByBoss,om.CompanyID FROM OtRequisitionMaster om JOIN BusinessNature bn ON bn.ID=om.SectionID WHERE om.ID={otRequisitionMasterId}";
                OtRequisitionModel requisition = con.QuerySingle<OtRequisitionModel>(selectOtApplication);
                string selectApplicationDetails = $"SELECT od.ID,od.OtRequisitionMasterID,od.EmpCode,ve.EmpName,ve.Designation,od.OtDate,od.OtHours,od.ApprovedHours,od.IsReplace FROM OtRequisitionDetails od JOIN View_EmployeeAll ve ON ve.EmpCode=od.EmpCode WHERE od.OtRequisitionMasterID={otRequisitionMasterId}";
                requisition.OtRequisitionDetails = con.Query<OtRequisitionDetailsModel>(selectApplicationDetails).ToList();
                return requisition;
            }
        }
        /// <summary>
        /// Get Approved Total Ot Requisition details month wise
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="otMonth">value should be yyyyMM format</param>
        /// <param name="empCode"></param>
        /// <returns></returns>
        private static List<OtRequisitionDetailsModel> GetMonthlyApprovedOt(int companyId, string otMonth, string empCode = "-1", int departmentId = -1, int locationId = -1)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = companyId,
                    OtMonth = otMonth,
                    EmpCode = empCode,
                    DepartmentID = departmentId,
                    LocationID = locationId
                };
                var monthWiseOt = con.Query<OtRequisitionDetailsModel>("spGetMonthlyApprovedOt", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return monthWiseOt;
            }
        }
        //------Ot Manual
        public static bool ManualEntry(OtManualEntryModel manualEntry)
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    manualEntry.EmpCode,
                    manualEntry.OtMonth,
                    manualEntry.OtHours,
                    manualEntry.CompanyID,
                    manualEntry.UserID
                };
                int rowAffect = con.Execute("spInsertUpdateOtManual", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        /// <summary>
        /// Get Manuat Entried Overtime
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="empCode"></param>
        /// <param name="otMonth">otMonth should be yyyyMM format</param>
        /// <returns></returns>
        public static List<OtManualEntryModel> GetManualOt(int companyId, string empCode = "-1", string otMonth = "-1")
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = companyId,
                    EmpCode = empCode,
                    OtMonth = otMonth
                };
                List<OtManualEntryModel> manualOt = con.Query<OtManualEntryModel>("spGetManualOt", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return manualOt;
            }
        }
        //------Ot Calculation
        public static List<OtProcessModel> OtCalculate(int companyId, int departmentId, int locationId, string otMonth)
        {
            var existProcessedOt = GetProcessedOt(companyId, departmentId, locationId, otMonth);
            if (existProcessedOt.Any())
            {
                return existProcessedOt;
            }
            var selectedEmployees = Employment.GetEmployee<OtProcessModel>(companyId, departmentId, locationId);
            List<OtProcessModel> processedEmployees = new List<OtProcessModel>();
            foreach (var emp in selectedEmployees)
            {
                var otDetails = GetMonthlyApprovedOt(companyId, otMonth, emp.EmpCode, departmentId, locationId);
                if (otDetails.Any())
                {
                    double totalOtHour = 0;
                    foreach (var od in otDetails)
                    {
                        double dutyHour = AttendenceApplication.GetEmpWorkedHour(companyId, od.EmpCode, od.OtDate.ToString("yyyyMMdd"));
                        double dailyOt = ((dutyHour - 8.0) >= 2.0) ? (dutyHour - 8.0) : 0;
                        totalOtHour += (dutyHour > od.OtHours) ? od.OtHours : dailyOt;
                    }
                    totalOtHour += GetManualOt(companyId, emp.EmpCode, otMonth).Sum(c => c.OtHours);
                    emp.TotalHour = totalOtHour;
                    emp.OtMonth = otMonth;
                    processedEmployees.Add(emp);
                }
            }
            return processedEmployees;
        }
        public static bool SaveOtProcess(List<OtProcessModel> processedOt)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var op in processedOt)
                        {
                            object paramObj = new
                            {
                                op.EmpCode,
                                op.OtMonth,
                                op.TotalHour,
                                op.PayAmount,
                                op.BankName,
                                op.AccNo,
                                op.CompanyID
                            };
                            int rowAffect = con.Execute("spInsertUpdateOtProcess", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception err)
                    {
                        throw new Exception(err.Message);
                    }
                }
            }
        }
        public static List<OtProcessModel> GetProcessedOt(int companyId, int departmentId, int locationId, string otMonth)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string selectSql = $@"SELECT op.ID, op.EmpCode, vei.EmpName, vei.Designation,op.OtMonth, op.TotalHour,op.PayAmount,b.Description AS BankName, ee.AccountNo AS AccNo,op.CompanyID
 FROM OtProcess op JOIN view_employment_info vei ON vei.EmpCode = op.EmpCode
LEFT JOIN EmpEnrolment ee ON ee.EmpCode = op.EmpCode
LEFT JOIN Bank b ON b.ID = ee.Bank
WHERE op.OtMonth='{otMonth}' AND op.CompanyID={companyId} AND vei.DepartmentID={departmentId} AND vei.Location={locationId}";
                var listOfProcessOt = con.Query<OtProcessModel>(selectSql).ToList();
                return listOfProcessOt;
            }
        }
        public static List<OtProcessModel> OtPayment(int companyId, int departmentId, int locationId, string otMonth)
        {
            var processedOt = GetProcessedOt(companyId, departmentId, locationId, otMonth);
            foreach (var emp in processedOt)
            {
                if (emp.TotalHour > 0)
                {
                    double basicSalary = EmpSalaryStructure.GetCurrentBasicSalary(emp.EmpCode, companyId);
                    emp.PayAmount = ((basicSalary * 2) / 208) * emp.TotalHour;
                }
                else
                {
                    emp.PayAmount = 0;
                }
            }
            return processedOt;
        }

        //-----Ot Replace
        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="empCode"></param>
        /// <param name="otDate">otDate format should be yyyyMMdd</param>
        /// <returns></returns>
        public static List<OtReplaceViewModel> GetReplacedApprovedOt(int companyId, string empCode = "-1", string otDate = "-1")
        {
            object paramObj = new
            {
                CompanyID = companyId,
                EmpCode = empCode,
                OtDate = otDate
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                List<OtReplaceViewModel> replacedOt = con.Query<OtReplaceViewModel>("spGetReplacedApprovedOt", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return replacedOt;
            }
        }
        public static bool ApplyOtReplace(OtReplaceModel otReplace)
        {
            var otRequisitionInfo = GetReplacedApprovedOt(otReplace.CompanyID, otReplace.EmpCode, otReplace.OtDate.ToString("yyyyMMdd")).FirstOrDefault();
            if (otRequisitionInfo == null)
            {
                throw new Exception($"No OT found on {otReplace.OtDate.ToString("MMM dd, yyyy")}");
            }
            if (otRequisitionInfo.OtHours < otReplace.ReplacedHours)
            {
                throw new Exception("Balance not available on this day!");
            }
            if (GetOtReplaceApplication(otReplace.CompanyID, otReplace.EmpCode, otReplace.ReplacedDate.ToString("yyyyMMdd")).Count > 0)
            {
                throw new Exception($"{otReplace.ReplacedDate.ToString("MMM dd, yyyy")} already replaced by another OT");
            }
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string insertSql = $@"INSERT INTO OtReplace (OtRequisitionDetailsID, EmpCode, ReplacedHours, ReplacedDate, CompanyID, ApplyDate)
VALUES({otRequisitionInfo.ID}, '{otReplace.EmpCode}', {otReplace.ReplacedHours}, '{otReplace.ReplacedDate}', {otReplace.CompanyID}, '{otReplace.ApplyDate}')";
                int rowAffect = con.Execute(insertSql);
                return rowAffect > 0;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="empCode"></param>
        /// <param name="replacedDate">replacedDate format should be yyyyMMdd</param>
        /// <returns></returns>
        public static List<OtReplaceModel> GetOtReplaceApplication(int companyId, string empCode = "-1", string replacedDate = "-1")
        {
            string selectSql = $@"SELECT * FROM OtReplace
WHERE EmpCode = CASE WHEN {empCode}<>'-1' THEN {empCode} ELSE EmpCode END
AND CONVERT(VARCHAR,ReplacedDate, 112) = CASE WHEN {replacedDate}<>'-1' THEN {replacedDate} ELSE CONVERT(VARCHAR,ReplacedDate, 112) END
AND CompanyID = {companyId}";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                List<OtReplaceModel> replaceApplications = con.Query<OtReplaceModel>(selectSql).ToList();
                return replaceApplications;
            }
        }
    }
}