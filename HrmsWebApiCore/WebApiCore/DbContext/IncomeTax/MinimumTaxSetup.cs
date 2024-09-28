using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class MinimumTaxSetup
    {
        public static List<TaxMinimumTaxModel> getAll(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            List<TaxMinimumTaxModel> minTax = conn.Query<TaxMinimumTaxModel>("SELECT * FROM TaxMinimumTax WHERE TaxYearID=" + id).ToList();
            return minTax;
        }

        public static TaxMinimumTaxModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            TaxMinimumTaxModel slabIncomeTax = conn.QuerySingle<TaxMinimumTaxModel>("SELECT *FROM TaxMinimumTax WHERE ID=" + id);
            return slabIncomeTax;
        }


        public static bool saveMinimumTax(TaxMinimumTaxModel minimumTaxModel)
        {
            if (minimumTaxModel.ID == 0)
            {
                var conn = new SqlConnection(Connection.ConnectionString());
                string quire = $"INSERT INTO TaxMinimumTax(TaxYearID,MinimumTax,InvestRate,InvestMaxamount,RebateRate,CarPersent,HousePersent,SDate,Note,CompanyID)" +
                    $" VALUES ('{minimumTaxModel.TaxYearID}','{ minimumTaxModel.MinimumTax }' ,'{ minimumTaxModel.InvestRate}','{ minimumTaxModel.InvestMaxamount}' , '{ minimumTaxModel.RebateRate }'," +
                    $" '{minimumTaxModel.CarPersent}' , '{minimumTaxModel.HousePersent }','{minimumTaxModel.SDate }','{minimumTaxModel.Note}','{minimumTaxModel.CompanyID}')";
                int rowAffected = conn.Execute(quire);
                return rowAffected > 0;
            }
            else
            {
                var conn = new SqlConnection(Connection.ConnectionString());
                string quire = $"UPDATE TaxMinimumTax SET TaxYearID='{minimumTaxModel.TaxYearID}',MinimumTax='{minimumTaxModel.MinimumTax}',InvestRate='{ minimumTaxModel.InvestRate}',InvestMaxamount='{ minimumTaxModel.InvestMaxamount}'," +
                    $"RebateRate='{ minimumTaxModel.RebateRate }',CarPersent='{minimumTaxModel.CarPersent}',HousePersent='{minimumTaxModel.HousePersent }',SDate='{minimumTaxModel.SDate }',Note='{minimumTaxModel.Note}',CompanyID='{minimumTaxModel.CompanyID}' WHERE ID="+minimumTaxModel.ID;
                int rowAffected = conn.Execute(quire);
                return rowAffected > 0;
            }
           

        }

    }
}
