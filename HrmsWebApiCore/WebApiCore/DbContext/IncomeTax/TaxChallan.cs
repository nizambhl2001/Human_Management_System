using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public static class TaxChallan
    {
        public static bool saveTaxChallan(TaxChallanModel taxChallanModel)
        {
            // string date = taxChallanModel.ChallanDate;
            string credate = DateTime.Now.ToShortDateString();

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO TaxChallan(TaxYearID,TaxChallanNo,ChallanDate,SalaryPeriodID,CreatedDate,CompanyID)VALUES" +
                $"('{taxChallanModel.TaxYearID}','{taxChallanModel.TaxChallanNo}','{taxChallanModel.ChallanDate}','{taxChallanModel.SalaryPeriodID}'," +
                $"'{taxChallanModel.CreatedDate=credate}','{taxChallanModel.CompanyID}')";

            int rowAffected = conn.Execute(quire);
            return rowAffected>0;
        }


        public static bool UpdateChallan(TaxChallanModel taxChallanModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string credate = DateTime.Now.ToShortDateString();

            var quire = $"UPDATE TaxChallan SET TaxYearID='{taxChallanModel.TaxYearID}', TaxChallanNo='{taxChallanModel.TaxChallanNo}'," +
                $"ChallanDate='{taxChallanModel.ChallanDate}',SalaryPeriodID='{taxChallanModel.SalaryPeriodID}'," +
                $"CreatedDate='{taxChallanModel.CreatedDate = credate}' WHERE ID={taxChallanModel.ID} AND CompanyID='{taxChallanModel.CompanyID}'";

            int rowAffected = conn.Execute(quire);
            return rowAffected>0;
        }


        public static List<TaxChallanViewModel> GetTaxChallanListByComId(int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $" TaxChallan.CompanyID={comid}";
            List<TaxChallanViewModel> result = getTaxChallanList(quire);
            return result;
        }



        public static List<TaxChallanViewModel> getTaxChallanListByTaxYearID(int taxYearId,int comId) {

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"TaxChallan.TaxYearID ={taxYearId} AND TaxChallan.CompanyID = {comId}";
            List<TaxChallanViewModel> result = getTaxChallanList(quire);
            return result;
        }




        public static List<TaxChallanViewModel> getTaxChallanList(string filter)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string sqlString = string.Empty;
            switch (filter)
            {
                case "":
                    sqlString = string.Format("SELECT  TaxChallan.ID, TaxChallan.TaxYearID, TaxChallan.TaxChallanNo, " +
                        " TaxChallan.ChallanDate, TaxChallan.SalaryPeriodID, TaxYearInfo.TaxYearName, SalaryPeriod.PeriodName " +
                        " FROM  TaxChallan INNER JOIN TaxYearInfo ON TaxChallan.TaxYearID = TaxYearInfo.ID INNER JOIN " +
                        " SalaryPeriod ON TaxChallan.SalaryPeriodID = SalaryPeriod.ID  ORDER BY TaxChallan.TaxYearID, CONVERT(varchar(15), ChallanDate, 101)");
                    break;
                default:
                    sqlString = string.Format("SELECT  TaxChallan.ID, TaxChallan.TaxYearID, TaxChallan.TaxChallanNo, " +
                       " TaxChallan.ChallanDate, TaxChallan.SalaryPeriodID, TaxYearInfo.TaxYearName, SalaryPeriod.PeriodName " +
                       " FROM  TaxChallan INNER JOIN TaxYearInfo ON TaxChallan.TaxYearID = TaxYearInfo.ID INNER JOIN " +
                       " SalaryPeriod ON TaxChallan.SalaryPeriodID = SalaryPeriod.ID " +
                       " WHERE {0} ORDER BY TaxChallan.TaxYearID, CONVERT(varchar(15), ChallanDate, 101) ", filter);
                    break;

            }

            List<TaxChallanViewModel> challanList = conn.Query<TaxChallanViewModel>(sqlString).ToList();
            return challanList;

        }

            public static TaxChallanModel getById(int id,int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $" SELECT * FROM TaxChallan WHERE ID={id} and CompanyID={comid}";
            //string quire = $"SELECT ID,EmpCode,TaxYearID,PersentID as ID,SDate,CompanyID FROM SearchargeAssain WHERE ID={id}"; 
            TaxChallanModel result = conn.QuerySingle<TaxChallanModel>(quire);
            return result;
        }
    }

}
