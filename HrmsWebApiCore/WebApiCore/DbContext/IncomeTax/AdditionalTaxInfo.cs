using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class AdditionalTaxInfo
    {
        public static bool saveAdditionalTaxInfo(AdditionalTaxInfoModel additionalTax)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO AdditionalTaxInfo(EmpCode,SalaryHeadID,ExemptAmount,ExemptPercent,ExemptRule,TaxYearID,CompanyID)" +
                $"VALUES('{additionalTax.EmpCode}','{additionalTax.SalaryHeadID}','{additionalTax.ExemptAmount}','{additionalTax.ExemptPercent}','{additionalTax.ExemptRule}'," +
                $"'{additionalTax.TaxYearID}','{additionalTax.CompanyID}') ";
            int rowAffected = conn.Execute(quire);
            return rowAffected >0;
        }

        public static bool UpdateAdditionalTaxInfo(AdditionalTaxInfoModel additionalTax)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPDATE AdditionalTaxInfo SET EmpCode='{additionalTax.EmpCode}', SalaryHeadID='{additionalTax.SalaryHeadID}'," +
                $"ExemptAmount='{additionalTax.ExemptAmount}',ExemptPercent='{additionalTax.ExemptPercent}',ExemptRule='{additionalTax.ExemptRule}'," +
                $"TaxYearID='{additionalTax.TaxYearID}',CompanyID='{additionalTax.CompanyID}' WHERE ID={additionalTax.ID}";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static AdditionalTaxInfoModel getAdditionalTaxInfobyId(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM AdditionalTaxInfo WHERE ID={id}";
            AdditionalTaxInfoModel result = conn.QuerySingle<AdditionalTaxInfoModel>(quire);
            return result;
        }




        public static bool deleteAdditionalTaxInfo(int id) {

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE AdditionalTaxInfo WHERE ID={id}";
            int  rowAffected = conn.Execute(quire);
            return rowAffected>0;
        }

        public static List<AdditionalTaxInfoModel> getTaxInfoList(int comid)
        {
            string quire = $"AM.CompanyID = {comid}";
            List<AdditionalTaxInfoModel> result = getAddtionalTaxInfoListByFilter(quire);
            return result;
        }


        public static List<AdditionalTaxInfoModel> getAddtionalTaxInfoListByFilter(string filter)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string sqlString = string.Empty;
            switch (filter)
            {
                case "":
                    sqlString = string.Format("SELECT  AM.ID, AM.EmpCode, AM.SalaryHeadID, AM.ExemptAmount, AM.ExemptPercent, AM.ExemptRule, AM.TaxYearID, " +
                                            " SH.AccountName, EI.EmpName " +
                                " FROM AdditionalTaxInfo AM INNER JOIN EmployeeInfo EI ON AM.EmpCode = EI.EmpCode INNER JOIN " +
                                " SalaryHead SH ON AM.SalaryHeadID = SH.ID");
                    break;
                default:
                    sqlString = string.Format("SELECT  AM.ID,AM.CompanyID, AM.EmpCode, AM.SalaryHeadID, AM.ExemptAmount, AM.ExemptPercent, AM.ExemptRule, AM.TaxYearID, " +
                                        " SH.AccountName, EI.EmpName " +
                                " FROM AdditionalTaxInfo AM INNER JOIN EmployeeInfo EI ON AM.EmpCode = EI.EmpCode INNER JOIN " +
                                " SalaryHead SH ON AM.SalaryHeadID = SH.ID WHERE {0}", filter);
                    break;

            }

            List<AdditionalTaxInfoModel> taxInfoList = conn.Query<AdditionalTaxInfoModel>(sqlString).ToList();
            return taxInfoList;
        }
    }
}
