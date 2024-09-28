using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.FinalSattlement;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.FinalSattlement
{
    public class FinalSattlementDb
    {
        /// ////////////////NoticeDay Setup//////////////////////
        public static List<NoticeDaySetupModel> getAllNoticeDay(int companyID, int gradeValue, int UserTypeID)
        {
            var con = new SqlConnection(Connection.ConnectionString());

            int Grade;
            if (UserTypeID != 1 && UserTypeID != 4)
            {
                Grade = gradeValue;
            }
            else
            {
                Grade = -1;
            }
            var param = new
            {
                GradeValue = Grade,
                CompanyID = companyID

            };
            List<NoticeDaySetupModel> noticeday = con.Query<NoticeDaySetupModel>("sp_NoticeDays_List", param: param,
                commandType: CommandType.StoredProcedure).ToList();
            return noticeday;

        }

        public static bool saveNoticeday(NoticeDaySetupModel noticeday)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    noticeday.ID,
                    noticeday.Grade,
                    noticeday.EmpDay,
                    noticeday.Day,
                    noticeday.SDate,
                    noticeday.Note,
                    noticeday.CompanyID
                };
                int rowAffect = con.Execute("INSertNoticeDay", param: paramOb,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }

        }

        public static NoticeDaySetupModel getNoticeDayByID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var noticeday = con.QuerySingle<NoticeDaySetupModel>("Select * from NoticeDay where ID=" + id);
            return noticeday;
        }
        /// //////////////////////////Notice Amount Setup/////////////////////
        public static List<NoticeAmountSetupModel> getAllNoticeAmount(int companyID, int gradeValue, int UserTypeID)
        {

            var con = new SqlConnection(Connection.ConnectionString());
            int Grade;
            if (UserTypeID != 1 && UserTypeID != 4)
            {
                Grade = gradeValue;
            }
            else
            {
                Grade = -1;
            }
            var param = new
            {
                GradeValue = Grade,
                CompanyID = companyID

            };
            List<NoticeAmountSetupModel> noticeamount = con.Query<NoticeAmountSetupModel>("sp_NoticeAmountsetup_List", param: param,
                commandType: CommandType.StoredProcedure).ToList();
            return noticeamount;

        }

        public static bool saveNoticeAmount(NoticeAmountSetupModel noticeamount)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    noticeamount.ID,
                    noticeamount.EmpGrade,
                    noticeamount.SalaryHead,
                    noticeamount.Numberoftimes,
                    noticeamount.EDate,
                    noticeamount.Note,
                    noticeamount.CompanyID,
                    noticeamount.UserID
                };
                int rowAffect = con.Execute("INSertNoticeAmountSetup", param: paramOb,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }

        }

        public static NoticeAmountSetupModel getNoticeAmountByID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var noticeamount = con.QuerySingle<NoticeAmountSetupModel>("Select * from NoticeAmountSetup where ID=" + id);
            return noticeamount;
        }

        ///////////////////////Gratuty setup//////////////////////
        public static List<GratuitySetupModel> getAllGratuity(int companyID, int gradeValue, int UserTypeID)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            int Grade;
            if (UserTypeID != 1 && UserTypeID != 4)
            {
                Grade = gradeValue;
            }
            else
            {
                Grade = -1;
            }
            var param = new
            {
                GradeValue = Grade,
                CompanyID = companyID

            };
            List<GratuitySetupModel> gratuity = con.Query<GratuitySetupModel>("sp_GratutySetup_List", param: param,
                commandType: CommandType.StoredProcedure).ToList();
            return gratuity;

        }

        public static bool saveOrUpdateGratuity(GratuitySetupModel gratuity)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    gratuity.ID,
                    gratuity.Grade,
                    gratuity.SalaryHead,
                    gratuity.Numberofallowance,
                    SDate = gratuity.SDate.ToShortDateString(),
                    gratuity.Note,
                    gratuity.CompanyID


                };
                int rowAffect = con.Execute("INSertGratutySetup", param: paramOb,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }

        }

        public static GratuitySetupModel getGratuityByID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var gratuity = con.QuerySingle<GratuitySetupModel>("Select * from GratutySetup where ID=" + id);
            return gratuity;
        }
        /////////////Gratuity Year setup//////////////////
        public static List<GratuityYearModel> getAllGratuityYear(int companyID, int gradeValue, int UserTypeID)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            int Grade;
            if (UserTypeID != 1 && UserTypeID != 4)
            {
                Grade = gradeValue;
            }
            else
            {
                Grade = -1;
            }
            var param = new
            {
                GradeValue = Grade,
                CompanyID = companyID

            };
            List<GratuityYearModel> gratuity = con.Query<GratuityYearModel>("sp_GratutyYear_List", param: param,
                commandType: CommandType.StoredProcedure).ToList();
            return gratuity;

        }

        public static bool saveOrUpdateGratuityYear(GratuityYearModel gratuityyear)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    gratuityyear.ID,
                    gratuityyear.Grade,
                    gratuityyear.GYear,
                    gratuityyear.SDate,
                    gratuityyear.Note,
                    gratuityyear.CompanyID


                };
                int rowAffect = con.Execute("INSertGratutyYearSetup", param: paramOb,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }

        }

        public static GratuityYearModel getGratuityYearByID(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var gratuityYear = con.QuerySingle<GratuityYearModel>("Select * from GratutyYear where ID=" + id);
            return gratuityYear;
        }
        /////////////////Final Settlement//////////////////////////

        public static FinalSettlementModel getEmpCode(FinalSettlementParam fsparam)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var empcode = con.QuerySingle<FinalSettlementModel>(
                "Select EmpCode from RegisnationInfo where EmpCode='" + fsparam.EmpCode + "' And CompanyID=" +
                fsparam.CompanyID + "");
            //if (empcode!=null)
            //{
            //    saveFinalSettlementSalary(fsparam);
            //    updateGratuityTax(fsparam);
            //    listoffinalsettlement(fsparam);
            //}
            return empcode;
        }



        public static bool saveFinalSettlementSalary(FinalSettlementParam finalSettlement)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                finalSettlement.EmpCode,
                LWDate = finalSettlement.LastWorkingDate,
                finalSettlement.CompanyID,
                finalSettlement.PeriodID,
                finalSettlement.comnoticeday,
                finalSettlement.empnoticeday,
                finalSettlement.calculationtype,
                finalSettlement.Nodeduct

            };
            int rowAffect = con.Execute("ProcessFinalSettlementSalary", param: param,
                commandType: CommandType.StoredProcedure);
            return rowAffect > 0;

        }

        //public static bool updateGratuityTax(FinalSettlementParam gratuitytax,int userTypeId)
        //{
        //    var con = new SqlConnection(Connection.ConnectionString());
           
        //    var param = new
        //    {
        //        Bonustype = gratuitytax.Bonustype = 6,
        //        empCode1 = gratuitytax.EmpCode,
        //        gratuitytax.CompanyID
        //    };
        //    int rowAffect = con.Execute("spProcessEmpFinalSettlementTAX", param: param,
        //        commandType: CommandType.StoredProcedure, commandTimeout: 50000);
        //    return rowAffect > 0;
        //}

        //public static FinalSettlementModel listoffinalsettlement(FinalSettlementParam finallist)
        //{
        //    var con = new SqlConnection(Connection.ConnectionString());
        //    var paramo = new
        //    {
        //        finallist.EmpCode,
        //        finallist.CompanyID,
        //        finallist.grade,
        //        LWDate = finallist.LastWorkingDate,
        //        finallist.comnoticeday,
        //        finallist.empnoticeday,
        //        finallist.calculationtype,
        //        finallist.Nodeduct
        //    };
        //    FinalSettlementModel finalsettlementlist = con.QuerySingle<FinalSettlementModel>("sp_GetFinalSettlementAmount", param: paramo, commandType: CommandType.StoredProcedure);
        //    return finalsettlementlist;
        //}

        public static bool saveFinalSettlement(FinalSettlementModel finalsettlement)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var paramOb = new
            {
                finalsettlement.EmpCode,
                finalsettlement.DueSalary,
                finalsettlement.NoticeEmp,
                finalsettlement.EL,
                finalsettlement.Gratuty,
                finalsettlement.Death,
                finalsettlement.Exgratia,
                finalsettlement.OverTime,
                finalsettlement.NoticePayCompany,
                finalsettlement.ExcessSalary,
                finalsettlement.EPS,
                finalsettlement.Mobile,
                finalsettlement.StaffOther,
                finalsettlement.WPPF,
                finalsettlement.PFOwn,
                finalsettlement.PFCompany,
                finalsettlement.PFLoan,
                finalsettlement.PFLInterest,
                finalsettlement.Tax,
                finalsettlement.DriverAllowance,
                finalsettlement.LastWorkingDate,
                finalsettlement.CompanyID,
                finalsettlement.PeriodID,
                finalsettlement.PerformanceBonus,
                finalsettlement.DueHospitalizationCoverage,
                finalsettlement.LaptopAdv
            };
            int rowAffect = con.Execute("INSertupdateFinalSettlementInfo", param: paramOb,commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        // Setu // Final Settlement
        // select all inActive Employee
        internal static List<FinalSettlementModel> getInactiveEmployee(int gradeValue, int companyId)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                GradeValue = (gradeValue!=1 && gradeValue!=4)? gradeValue:-1,
                CompanyID = companyId

            };
            List<FinalSettlementModel> employees = con.Query<FinalSettlementModel>("sp_AutoComplete_Inactive_List", param: param, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }

   
            // ===============Mostafij New Add ===================

        internal static FinalSettlementModel GetCalculateFinalSattlement(FinalSettlementModel finalSattlementEntity)
        {

             var seperationEmpCode=(getSeperationEmployee(finalSattlementEntity.EmpCode, finalSattlementEntity.CompanyID));
            if (seperationEmpCode != null)
            {
                using (var con = new SqlConnection(Connection.ConnectionString()))
                {
                    con.Open();
                    
                    using (var tran = con.BeginTransaction())
                    {
                        try
                        {
                            SaveFinalSettlementSalaryInfo(finalSattlementEntity,con,tran);
                            SaveGratuityTax(finalSattlementEntity,con,tran);
                            FinalSettlementModel gratuatyAmount = GetGratuityAmount(finalSattlementEntity,con,tran);
                            tran.Commit();
                            return gratuatyAmount;
                        }
                        catch (Exception ex )
                        {
                            tran.Rollback();
                            throw new Exception(ex.Message);
                        }
                       
                    }
                    
                }
               
            }
            else
            {
                throw new Exception($"Selected Employee is not separated!");
            }
           
        }


        //getSeperated Employee Mostafij
       internal static object getSeperationEmployee(string empCode,int companyID)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var sql = "SELECT EmpCode FROM RegisnationInfo WHERE EmpCode='" + empCode + "' AND CompanyID=" + companyID + "";
         
            try
            {
              var employees = con.Query(sql, commandType: CommandType.Text).FirstOrDefault();
                return employees;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
             
            
        }


        //=====================================================================  Mostatfij ============================================
        internal static bool SaveFinalSettlementSalaryInfo(FinalSettlementModel entity,SqlConnection conn,SqlTransaction tran)
        {
           
            var paramObject = new
            {
                entity.EmpCode,
                LWDate = entity.LWDate.ToString("yyyy-MM-dd"),
                entity.CompanyID,
                entity.PeriodID,
                entity.Comnoticeday,
                entity.Empnoticeday,
                entity.Calculationtype,
                entity.Nodeduct

            };
            int rowAffect = conn.Execute("ProcessFinalSettlementSalary", param: paramObject,transaction:tran, commandType: CommandType.StoredProcedure, commandTimeout:10);
            
            return rowAffect>0;
        }

        private static bool SaveGratuityTax(FinalSettlementModel entity, SqlConnection conn, SqlTransaction tran)
        {

            var paramObject = new
            {
                Bonustype = 6,
                empCode1 = entity.EmpCode,
                CompanyID = entity.CompanyID
            };
            int rowAffect = conn.Execute("spProcessEmpFinalSettlementTAX", param: paramObject,transaction:tran, commandType: CommandType.StoredProcedure,commandTimeout:25);
            return rowAffect>0;
        }


        internal static FinalSettlementModel GetGratuityAmount(FinalSettlementModel entity, SqlConnection conn, SqlTransaction tran)
        {
          
            var param = new
            {
                entity.EmpCode,
                entity.CompanyID,
                grade = entity.GradeValue,
                entity.LWDate,
                comnoticeday = entity.Comnoticeday,
                empnoticeday = entity.Empnoticeday,
                calculationtype = entity.Calculationtype,
                entity.Nodeduct
            };
            var amounts = conn.QuerySingle<FinalSettlementModel>("sp_GetFinalSettlementAmount", param: param,transaction:tran, commandType: CommandType.StoredProcedure, commandTimeout:20);
            return amounts;
        }
    }
}
