using Dapper.Framework;
using HRMS.Models.Leave;
using HRMS.ViewModels.Leave;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApiCore.Models.Leave;
using WebApiCore.ViewModels.Leave;

namespace HRMS.DbContext
{
    public class Leave
    {
        //Leave Type
        public static bool SaveOrUpdateLeaveType(LeaveTypeModel leaveType)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                if (leaveType.ID > 0)
                {
                    leaveType.pOptions = 2;
                }
                else
                {
                    leaveType.pOptions = 1;
                }
                object leavTypeObj = leaveType;
                int rowAffect = con.Execute("sp_Leavetype_New", param: leavTypeObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }


        //public static List<LeaveTypeModel> GetLeaveType(int empCode, int gender)
        //{
        //    using (var con = new SqlConnection(Connection.ConnectionString()))
        //    {
        //        var types = con.Query<LeaveTypeModel>("sp_getLeaveType", param: new { empCode = empCode, gender }, commandType: CommandType.StoredProcedure).ToList();
        //        return types;
        //    }
        //}

        public static List<LeaveTypeModel> GetLeaveType(int grade, int gender)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var types = con.Query<LeaveTypeModel>("sp_getLeaveTypeGradeValue", param: new { Grade = grade, gender }, commandType: CommandType.StoredProcedure).ToList();
                return types;
            }
        }

        public static bool DeleteLeaveType(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE Leavetype WHERE ID = " + id);
                return rowAffect > 0;
            }
        }

        //Leave Entry/Apply
        public static List<LeaveStatusVM> GetLeaveStatus(int compId,string empCode, int periodId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object filterObj = new
                {
                    EmpCode = empCode,
                    PeriodID = periodId,
                    CompanyID = compId,
                    //for startech
                   // grade = grade,
                    //Gender = gender
                };
                var leaveStatus = con.Query<LeaveStatusVM>("spRptLeaveStatusShow", param: filterObj, commandType: CommandType.StoredProcedure).ToList();
                return leaveStatus;
            }
        }
       
        public static List<LeaveApplyModel> GetLeaveInfo(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    EmpCode = empCode
                };
                var leaveInfo = con.Query<LeaveApplyModel>("sp_LeaveInfo_List", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return leaveInfo;
            }
        }

        public static List<LeaveApplyModel> GetLeaveInfoByUser(int compId, string date)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    Date = date
                };
                var leaveInfo = con.Query<LeaveApplyModel>("sp_LeaveApplyByUser", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return leaveInfo;
            }
        }

        public static bool Apply(LeaveApplyModel leaveApply)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var applyObj = new
                {
                    leaveApply.ID,
                    leaveApply.EmpCode,
                    leaveApply.LSDate,
                    leaveApply.LEDate,
                    leaveApply.LADate,
                    leaveApply.AccepteDuration,
                    leaveApply.LTypedID,
                    leaveApply.UnAccepteDuration,
                    leaveApply.ReferanceEmpcode,
                    leaveApply.Withpay,
                    leaveApply.AppType,
                    leaveApply.YYYYMMDD,
                    leaveApply.CompanyID,
                    leaveApply.ApplyTo,
                    leaveApply.RecommendTo,
                    leaveApply.Reason,
                    leaveApply.EmgContructNo,
                    leaveApply.EmgAddress,
                    leaveApply.UserName,
                    leaveApply.Grandtype
                };
                int rowAffect = con.Execute("INSertupdateLeaveInfo", param: applyObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }

        }
        public static LeaveApplyModel GetLeaveApplication(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var application = con.QuerySingle<LeaveApplyModel>($"SELECT * FROM Leaveinfo WHERE ID={id}");
                return application;
            }
        }

        //Manual Entry
        public static bool ManualEntry(List<LeaveApplyModel> manualLeaveList)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in manualLeaveList)
                        {
                            object manualLeaveObj = new
                            {
                                item.EmpCode,
                                item.LSDate,
                                item.LEDate,
                                item.LADate,
                                item.AccepteDuration,
                                item.LTypedID,
                                item.Withpay,
                                item.AppType,
                                item.Grandtype,
                                item.CompanyID,
                                item.Reason,
                                item.EmgContructNo,
                                item.EmgAddress
                            };
                            int rowAffect = con.Execute("INSertManualLeave", param: manualLeaveObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            if (rowAffect == 0)
                            {
                                throw new Exception("Failed to Manual Setup!");
                            }
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception)
                    {
                        tran.Rollback();
                        return false; ;
                    }
                }
            }
        }

        //Update Leave Entry
        public static List<LeaveApplyViewModel> GetLeaveInfoForUpdate(int compId, int gradeValue, string empCode, DateTime startDate, DateTime endDate)
        {
            var paraObj = new
            {
                CompanyID = compId,
                GradeValue = gradeValue,
                EmpCode = empCode,
                StrDate = startDate,
                EndDate = endDate
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<LeaveApplyViewModel>("sp_GetLeaveForUpdate", param: paraObj, commandType: CommandType.StoredProcedure).ToList();
                return items;
            }
        }
        public static bool UpdateLeaveInfo(List<LeaveApplyModel> leaveInfoList)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in leaveInfoList)
                        {
                            object leaveInfoObj = new
                            {
                                item.ID,
                                item.EmpCode,
                                item.LSDate,
                                item.LEDate,
                                item.LADate,
                                item.AccepteDuration,
                                item.LTypedID,
                                item.Withpay,
                                item.CompanyID
                            };
                            int rowAffect = con.Execute("UpdateLeaveLeaveInfo", param: leaveInfoObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            if (rowAffect == 0)
                            {
                                throw new Exception("Failed to update!");
                            }
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception)
                    {
                        tran.Rollback();
                        return false;
                    }
                }
            }
        }

        public static bool UpdateByAuthority(LeaveApplyModel leaveInfo)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    leaveInfo.ID,
                    leaveInfo.LADate,
                    leaveInfo.LSDate,
                    leaveInfo.LEDate,
                    leaveInfo.LTypedID,
                    leaveInfo.Withpay,
                    leaveInfo.AccepteDuration,
                    leaveInfo.UnAccepteDuration,
                    leaveInfo.AuthorityEmpcode,
                    leaveInfo.CompanyID,
                    leaveInfo.Grandtype,
                    leaveInfo.AppType,
                   leaveInfo.ForwardEmpCode
                };
                int rowAffect = con.Execute("updateLeaveInfoDHEdite", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        

        //Leave Recommend
        public static List<LeaveApplyViewModel> GetWaitingLeaveForRecommend(int compId, string year, string empCode)
        {
            var paramObj = new
            {
                CompanyID = compId,
                YEAR = year,
                EmpCode = empCode
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var applications = con.Query<LeaveApplyViewModel>("sp_GetLeaveWaitforRecommendAll", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return applications;
            }
        }

        //Leave Approve
        public static List<LeaveApplyViewModel> GetWaitingLeaveForApprove(int compId, string year, string empCode)
        {
            var paramObj = new
            {
                CompanyID = compId,
                YEAR = year,
                EmpCode = empCode
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var applications = con.Query<LeaveApplyViewModel>("sp_GetLeaveWaitforApproveAll", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return applications;
            }
        }


        public static bool UpdateLeaveInfoStatus(LeaveInfoStatusModel lsi)
        {
            var paramObj = new
            {
                lsi.Type,
                ID = lsi.LeaveID,
                CompanyID = lsi.COmpanyID,
                lsi.ReqFrom,
                lsi.ReqTo,
                lsi.Remarks
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("INSertupdateLeaveInfoStatus", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<LeaveStatus> getLeaveStaus(LeaveInfoStatusModel lsi)
        {
            var paramObj = new
            {
                lsi.Type,
                ID = lsi.LeaveID,
                CompanyID = lsi.COmpanyID,
                lsi.ReqFrom,
                lsi.ReqTo,
                lsi.Remarks
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var dataset = con.Query<LeaveStatus>("INSertupdateLeaveInfoStatus", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return dataset;
            }
        }
        public static List<LeaveApplyViewModel> GetLeaveInfoForHrApprove(int compId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var applications = con.Query<LeaveApplyViewModel>("sp_GetLeaveApproveForHR", param: new { companyid = compId }, commandType: CommandType.StoredProcedure).ToList();
                return applications;
            }
        }

        //public static List<LeaveApplyViewModel> GetLeaveInfoForHrApprove(int compId, int year)
        //{
        //    using (var con = new SqlConnection(Connection.ConnectionString()))
        //    {
        //        var applications = con.Query<LeaveApplyViewModel>("sp_GetLeaveApproveForHR", param: new { companyid = compId, Year = year }, commandType: CommandType.StoredProcedure).ToList();
        //        return applications;
        //    }
        //}

        //Approve By HR

        public static bool ApproveByHr(LeaveDetailsViewModel leaveDetailsVm)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        DateTime leaveDate = leaveDetailsVm.StartDate.Date;
                        while (leaveDate <= leaveDetailsVm.EndDate.Date)
                        {
                            string sql = $"INSERT INTO LeaveDetails (LeaveID, EmpCode, LeaveDate) VALUES({leaveDetailsVm.LeaveID}, '{leaveDetailsVm.EmpCode}', '{leaveDate.ToString("MM/dd/yyyy")}')";
                            con.Execute(sql, transaction: tran);
                            leaveDate = leaveDate.AddDays(1);
                        }

                        string sql2 = $"UPDATE leaveinfo SET AppType=1 , Grandtype =1  WHERE ID={leaveDetailsVm.LeaveID}";

                        con.Execute(sql2, transaction: tran);

                        string sql3 = $"UPDATE LeaveinfoStatus SET Status=1  WHERE LeaveID={leaveDetailsVm.LeaveID}";

                        con.Execute( sql3, transaction: tran);

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
        public static bool CancelByHr(int leaveId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                    try
                    {

                        string sql = $"UPDATE leaveinfo SET AppType=2,Grandtype=3 WHERE ID={leaveId}";

                        con.Execute(sql, transaction: tran);

                        string sql2 = $"UPDATE LeaveinfoStatus  SET Status=3 WHERE ID={leaveId}";

                        con.Execute(sql2, transaction: tran);

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
        public static bool UpdateAndApproveByHr(LeaveApplyModel la)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        var paramObj = new
                        {
                            la.ID,
                            la.LSDate,
                            la.LEDate,
                            la.LADate,
                            la.AccepteDuration,
                            la.LTypedID,
                            la.UnAccepteDuration,
                            la.Withpay,
                            la.CompanyID,
                            la.Grandtype,
                            la.AppType,
                            la.AuthorityEmpcode,
                        };
                        int rowAffect = con.Execute("updateLeaveInfoDHEdite", param: paramObj, transaction: tran, commandTimeout: 20000, commandType: CommandType.StoredProcedure);

                        //Approve
                        if (rowAffect > 0)
                        {
                            LeaveDetailsViewModel leaveDetailsVm = new LeaveDetailsViewModel
                            {
                                LeaveID = (int)la.ID,
                                EmpCode = la.EmpCode,
                                StartDate = la.LSDate,
                                EndDate = la.LEDate

                            };
                            //ApproveByHr(leaveDetailsVm);
                            tran.Commit();
                            return true;
                        }
                        else
                        {
                            throw new Exception("Failed to Update!");
                        }
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }

        //Opening Balance
        public static List<EarnLeaveBalanceDetailsModel> GetEarnLeaveBalance(EarnLeaveBalanceViewModel filterModel)
        {
            object paramObj = new
            {
                empcode = filterModel.EmpCode,
                department = filterModel.Department,
                designation = filterModel.Designation,
                location = filterModel.JobLocation,
                filterModel.YearID,
                Comcod = filterModel.CompanyID,
                filterModel.Grade
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<EarnLeaveBalanceDetailsModel>("spGetEmpEarnleaveBalanceForEdit", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return items;
            }
        }
        public static bool OpeningBalenceSave(EarnLeaveBalanceModel leaveBalence)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var details in leaveBalence.Details)
                        {
                            if (details.ID == 0)
                            {
                                object leaveBalenceObj = new
                                {
                                    details.EmpCode,
                                    leaveBalence.LType,
                                    leaveBalence.YearID,
                                    details.Qty,
                                    Date = leaveBalence.DATE.ToString("MM/dd/yyyy"),
                                    leaveBalence.CompanyID,
                                    details.Note
                                };
                                con.Execute("sp_EarnLeaveBalance_Insert", param: leaveBalenceObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            }
                            else
                            {
                                object leaveBalenceObj = new
                                {
                                    details.ID,
                                    details.EmpCode,
                                    leaveBalence.LType,
                                    leaveBalence.YearID,
                                    details.Qty,
                                    Date = leaveBalence.DATE.ToString("MM/dd/yyyy"),
                                    leaveBalence.CompanyID,
                                    details.Note
                                };
                                con.Execute("sp_EarnLeaveBalance_Update", param: leaveBalenceObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            }
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

        //Carry Forward And Encashment
        public static List<EarnLeaveBalanceDetailsModel> GetCarryForwardOrEncashment(EarnLeaveBalanceViewModel filterModel)
        {
            object paramObj = new
            {
                Year = filterModel.YearID,
                BranchID = filterModel.JobLocation??"-1",
                DepartmentID = filterModel.Department??"-1",
                GradeValue = filterModel.Grade,
                filterModel.CompanyID,
                Type=filterModel.ExecuteType
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<EarnLeaveBalanceDetailsModel>("sp_GetCarryforwardAndEncashmentDay", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return items;
            }
        }
        public static bool CarryForwardInsertOrUpdate(EarnLeaveBalanceModel leaveBalance)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var details in leaveBalance.Details)
                        {
                            object leaveBalenceObj = new
                            {
                                details.EmpCode,
                                LType =details.LeaveTypeID,
                                leaveBalance.YearID,
                                details.Qty,
                                Date = leaveBalance.DATE.ToString("MM/dd/yyyy"),
                                leaveBalance.CompanyID,
                                details.Note
                            };
                            con.Execute("sp_CarryForword_Insert", param: leaveBalenceObj, transaction: tran, commandType: CommandType.StoredProcedure);
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
        public static bool SaveOrUpdateEncashment(EarnLeaveBalanceModel leaveBalance)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var details in leaveBalance.Details)
                        {
                            object leaveBalenceObj = new
                            {
                                details.EmpCode,
                                LType = details.LeaveTypeID,
                                leaveBalance.YearID,
                                details.Qty,
                                Date = leaveBalance.DATE.ToString("MM/dd/yyyy"),
                                leaveBalance.CompanyID,
                                details.Note
                            };
                            con.Execute("sp_EncashmentDay_Insert", param: leaveBalenceObj, transaction: tran, commandType: CommandType.StoredProcedure);
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

        //Substitute Leave
        public static List<EarnLeaveBalanceDetailsModel> GetSubstituteLeave(EarnLeaveBalanceViewModel filterModel)
        {
            object paramObj = new
            {
                Year = filterModel.YearID,
                BranchID = filterModel.JobLocation ?? "-1",
                DepartmentID = filterModel.Department ?? "-1",
                GradeValue = filterModel.Grade,
                filterModel.CompanyID,
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<EarnLeaveBalanceDetailsModel>("sp_Getsubstituteleave", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return items;
            }
        }
        public static bool SaveOrUpdateSubstituteLeave(EarnLeaveBalanceModel leaveBalance)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var details in leaveBalance.Details)
                        {
                            object leaveBalenceObj = new
                            {
                                details.EmpCode,
                                LType = details.LeaveTypeID,
                                leaveBalance.YearID,
                                details.Qty,
                                Date = leaveBalance.DATE.ToString("MM/dd/yyyy"),
                                leaveBalance.CompanyID,
                                details.Note
                            };
                            con.Execute("sp_SubstituteLeaveDay_Insert", param: leaveBalenceObj, transaction: tran, commandType: CommandType.StoredProcedure);
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
        //public static LeaveStatus getLeaveInfo(int id)
        //{
        //    var con = new SqlConnection(Connection.ConnectionString());
        //    var result = con.QuerySingle<LeaveStatus>("SELECT * FROM LeaveinfoStatus WHERE LeaveID=" + id);
        //    return result;
        //}
        public static List<LeaveStatus> getLeaveInfoStatus(string empCode, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                Type = 4,
                ID=0,
                ReqFrom="",
                ReqTo=empCode,
                CompanyID=companyId,
                Remarks=""
            };
            var dataset = con.Query<LeaveStatus>("INSertupdateLeaveInfoStatus", param: param, commandType: CommandType.StoredProcedure).ToList();
            return dataset;
        }


        public static bool DeleteById(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            {

                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {

                        string sql2 = $"Delete FROM Leaveinfo Where ID =" + id;

                        con.Execute(sql2, transaction: tran);

                        string sql3 = $"Delete FROM LeaveDetails Where LeaveID =" + id;

                        con.Execute(sql3, transaction: tran);

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
