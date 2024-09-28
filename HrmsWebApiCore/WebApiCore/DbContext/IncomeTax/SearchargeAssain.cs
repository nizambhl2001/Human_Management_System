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
    public class SearchargeAssain
    {
        public static bool saveUpdateSearChargeAssign(SearchargeAssainModel searchargeAssainModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                searchargeAssainModel.ID,
                searchargeAssainModel.EmpCode,
                searchargeAssainModel.TaxYearID,
                searchargeAssainModel.PersentID,
                searchargeAssainModel.SDate,
                searchargeAssainModel.CompanyID,

            };
            int rowAffected = conn.Execute("sp_SearchChargeAssain_Insert", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected>0;
        }


        public static List<SearchChargeSetupModel> serchargePersent(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM SearchChargeSetup WHERE TaxYear="+id;
            List<SearchChargeSetupModel> searchChargePersentage = conn.Query<SearchChargeSetupModel>(quire).ToList();
            return searchChargePersentage;
        }

        public static List<SearchargeAssaignViewModel> SearchargeAssainList(string empCode, int companyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT dbo.SearchargeAssain.ID, dbo.SearchargeAssain.EmpCode, dbo.SearchargeAssain.TaxYearID," +
                $" dbo.SearchargeAssain.PersentID, dbo.SearchargeAssain.SDate," +
                $" dbo.SearchargeAssain.CompanyID, dbo.SearchChargeSetup.SlabName," +
                $" dbo.SearchChargeSetup.SlabAmount, dbo.SearchChargeSetup.Persentage" +
                $" FROM dbo.SearchargeAssain INNER JOIN" +
                $" dbo.SearchChargeSetup ON dbo.SearchargeAssain.CompanyID = dbo.SearchChargeSetup.CompanyID" +
                $" AND dbo.SearchargeAssain.PersentID = dbo.SearchChargeSetup.ID" +
                $"  WHERE(dbo.SearchargeAssain.CompanyID = {companyID}) AND (dbo.SearchargeAssain.EmpCode = {empCode})";

            List<SearchargeAssaignViewModel> result = conn.Query<SearchargeAssaignViewModel>(quire).ToList();
            return result;
        }


        public static SearchargeAssainModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM SearchargeAssain WHERE ID=" + id;
            //string quire = $"SELECT ID,EmpCode,TaxYearID,PersentID as ID,SDate,CompanyID FROM SearchargeAssain WHERE ID={id}"; 
            SearchargeAssainModel searchCharge = conn.QuerySingle<SearchargeAssainModel>(quire);
            return searchCharge;
        }

    }
}
