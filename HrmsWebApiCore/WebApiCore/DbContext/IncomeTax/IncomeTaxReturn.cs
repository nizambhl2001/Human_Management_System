using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class IncomeTaxReturn
    {
        public static bool saveIncomeTaxReturn(IncomeTaxReturnModel taxReturnModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                taxReturnModel.EmpCode,
                taxReturnModel.TaxYearID,
                taxReturnModel.CompanyID,
                taxReturnModel.Date,
                taxReturnModel.UserName,
                Amount=taxReturnModel.WealthAmount,
                taxReturnModel.TaxableIncome,
                taxReturnModel.TaxPaid,
                taxReturnModel.SerialNo,
                taxReturnModel.Remarks,
            };

            int rowAffected = conn.Execute("INSertTaxReturnInfo", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }


        public static List<IncomeTaxReturnModel> taxReturnCheckList(string empCode, int taxYearID, int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode = empCode,
                TaxYearID = taxYearID,
                CompanyID = companyId
            };
            List<IncomeTaxReturnModel> checkList = conn.Query<IncomeTaxReturnModel>("sp_TaxReturnCheck_List", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return checkList;
        }
    }
}
