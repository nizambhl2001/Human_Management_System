using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class ChallanNumberAssaign
    {
        public static bool updateChallanNumber(ChallanPrepairModel challanPrepairModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj =new
            {
                challanPrepairModel.PeriodID,
                challanPrepairModel.ChallanNo,
                challanPrepairModel.ChallanDate,
                challanPrepairModel.GruopID,
                challanPrepairModel.CompanyID,
                challanPrepairModel.PaymentType,
                challanPrepairModel.BonusType
            };
            int rowAffected = conn.Execute("InsertTaXChallanNumber",param:obj,commandType:CommandType.StoredProcedure);
            return rowAffected>0;
        }

        public static List<ChallanPrepareViewModel> showAll(int periodId,int? gradeValue,int? branch,int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
               PeriodID=periodId,
               GradeValue=gradeValue,
               Branch=branch,
               CompanyID=comId
            };

            List<ChallanPrepareViewModel> ShowList = conn.Query<ChallanPrepareViewModel>("GetChallanPrepair", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return ShowList;
        }


        // GetTaxChallanBonusShow List
        public static List<ChallanPrepareViewModel> GetTaxChallanBonusShowList(int periodId, int? gradeValue,int bonusType, int? branch, int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                PeriodID = periodId,
                GradeValue = gradeValue,
                Branch = branch,
                CompanyID = comId,
                BonusType=bonusType
            };

            List<ChallanPrepareViewModel> ShowList = conn.Query<ChallanPrepareViewModel>("GetChallanPrepairBonus", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return ShowList;
        }

        public static bool saveChallanPrepare(ChallanPrepairModel cpModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
          
            conn.Open();
            using(var tran = conn.BeginTransaction())
            {
                try
                {
                    foreach (var item in cpModel.Details)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = "InsertTaXChallanPrepear";
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@EmpCode",item.EmpCode);
                            cmd.Parameters.AddWithValue("@PeriodID",cpModel.PeriodID);
                            cmd.Parameters.AddWithValue("@TaxYearID",cpModel.TaxYearID);
                            cmd.Parameters.AddWithValue("@SalaryHeadID",item.SalaryHeadID);
                            cmd.Parameters.AddWithValue("@Amount",item.Amount);
                            cmd.Parameters.AddWithValue("@ChallanNo",cpModel.ChallanNo);
                            cmd.Parameters.AddWithValue("@GruopID",cpModel.GruopID);
                            cmd.Parameters.AddWithValue("@GLNo",cpModel.GLNo);
                            cmd.Parameters.AddWithValue("@CompanyID",cpModel.CompanyID);
                            cmd.Parameters.AddWithValue("@PaymentType",cpModel.PaymentType);
                            cmd.Parameters.AddWithValue("@BonusType",item.BonusType);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    tran.Commit();
                    return true;
                }
                catch(Exception err)
                {
                    tran.Rollback();
                    throw new Exception(err.Message);
                }
            }
           
        }
    }
   }
