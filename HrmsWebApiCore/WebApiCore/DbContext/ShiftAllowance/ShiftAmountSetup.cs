using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper.Framework;
using HRMS.Models.ShiftAllowance;
using WebApiCore.ViewModels.ShiftAllowance;

namespace HRMS.DbContext.ShiftAllowance
{
    public class ShiftAmountSetup
    {
        public static bool Saveupdate(ShiftAmountSetupModel shiftAmount)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                shiftAmount.ID,
                shiftAmount.UserID,
                shiftAmount.EmployeeType,
                shiftAmount.Amount,
                shiftAmount.ShiftID,
                shiftAmount.CompanyID,
                
            };
            int rowAffect = conn.Execute("INSertShiftAllowanceSetup", param: param,
                commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }

       
        public static List<ShiftAllowanceSetupVM> GetShiftAllowaneAmount(int companyId, int grade,int UserTypeID)
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
                List<ShiftAllowanceSetupVM> shiftallowanceamount = con.Query<ShiftAllowanceSetupVM>("sp_ShiftAllowanceSetup_List", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return shiftallowanceamount;
            }
        }

        




    }
}
