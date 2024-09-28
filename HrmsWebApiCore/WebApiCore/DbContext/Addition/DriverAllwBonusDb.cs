using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.Addition;
using HRMS.ViewModels.Addition;

namespace HRMS.DbContext.Addition
{
    public class DriverAllwBonusDb
    {
        public static List<DriverBonusVM> getDriverAllwBonus(int companyId,int grade,int UserTypeID)
        {
            int Grade;
            if (UserTypeID != 1 && UserTypeID != 4)
            {
                Grade = grade;
            }
            else
            {
                Grade = -1;
            }
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    CompanyID = companyId,
                    Grade
                };
                List<DriverBonusVM> driverBonus = con.Query<DriverBonusVM>("spGetDriverBonus", param:paramObj , commandType: CommandType.StoredProcedure ).ToList();
                return driverBonus;
            }

        }

        public static List<DriverBonusType> getAllBonusType()
        {
            var con=new SqlConnection(Connection.ConnectionString());
            List<DriverBonusType> bonusTypes = con.Query<DriverBonusType>("select * from OtherPaymentType").ToList();
            return (bonusTypes);
        }

        public static bool SaveUpdate(DriverBonusModel driverallwbonus)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in driverallwbonus.SelectedDriver)
                        {
                            object paramObj = new
                            {
                              
                                driverallwbonus.BonusID,
                                driverallwbonus.PeriodID,
                                driverallwbonus.CompanyID,
                                PDate=(DateTime.Today.ToString("yyyy-MM-dd")),
                                driverallwbonus.SalaryHeadID,
                                driverallwbonus.UserID,
                                item.EmpCode,
                                item.Amount
                            };

                            con.Execute("sp_InsertDriverAllowanceBonus", param: paramObj, transaction: tran,
                                commandType: CommandType.StoredProcedure);
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
}
