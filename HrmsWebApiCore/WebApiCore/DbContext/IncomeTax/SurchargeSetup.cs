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
    public class SurchargeSetup
    {
        public static bool serchargeSaveUpdate(SearchChargeSetupModel searchChargeSetupModel )
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var Searchobj = new
            {
                searchChargeSetupModel.ID,
                searchChargeSetupModel.TaxYear,
                searchChargeSetupModel.SlabName,
                searchChargeSetupModel.SlabAmount,
                searchChargeSetupModel.Persentage,
                searchChargeSetupModel.Note,
                searchChargeSetupModel.setupDate,
                searchChargeSetupModel.CompanyID
            };
            int rowAffected = conn.Execute("sp_SearchCharge_Insert", param: Searchobj, commandType: CommandType.StoredProcedure);
            return rowAffected>0;
        }


        public static List<SearchChargeSetupModel> getAllSearchList(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM SearchChargeSetup WHERE TaxYear="+id;
            List<SearchChargeSetupModel> searchList = conn.Query<SearchChargeSetupModel>(quire).ToList();
            return searchList;

        }


        public static SearchChargeSetupModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM SearchChargeSetup WHERE ID="+id;
            SearchChargeSetupModel searchCharge = conn.QuerySingle<SearchChargeSetupModel>(quire);
            return searchCharge;
        }
    }
}
