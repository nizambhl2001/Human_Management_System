using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class SlabIncomeTax
    {
        public static bool saveSlabIncomeTax(SlabIncomeTaxModel slabIncomeTax)
        {
            var slabOr = slabIncomeTax.SlabOrder;
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO SlabIncomeTax(TaxYearID,SlabTypeID,Amount,TaxRate,SlabText,TaxAmount,CompanyID,SortOrder,SlabOrder) VALUES ('{ slabIncomeTax.TaxYearID }' ,'{ slabIncomeTax.SlabTypeID}'," +
                $" '{ slabIncomeTax.Amount}' , '{ slabIncomeTax.TaxRate }', '{slabIncomeTax.SlabText}' , '{slabIncomeTax.TaxAmount }','{slabIncomeTax.CompanyID }','{slabIncomeTax.SortOrder=slabOr }','{slabIncomeTax.SlabOrder}')";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool updateSlabIncomeTax(SlabIncomeTaxModel slabIncomeTax)
        {
            var slabOr = slabIncomeTax.SlabOrder;
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPDATE SlabIncomeTax SET TaxYearID='{ slabIncomeTax.TaxYearID }',SlabTypeID='{ slabIncomeTax.SlabTypeID}'," +
                $"Amount='{ slabIncomeTax.Amount}',TaxRate='{ slabIncomeTax.TaxRate }',SlabText='{slabIncomeTax.SlabText}',TaxAmount='{slabIncomeTax.TaxAmount }'," +
                $"CompanyID='{slabIncomeTax.CompanyID }',SortOrder='{slabIncomeTax.SortOrder = slabOr }',SlabOrder='{slabIncomeTax.SlabOrder}' WHERE ID={slabIncomeTax.ID}";
                int rowAffected = conn.Execute(quire);
                return rowAffected > 0;
        }

        public static List<SlabType> allSlabType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            List<SlabType> slabTypes = conn.Query<SlabType>("SELECT * FROM SlabType").ToList();
            return slabTypes;
        }

        public static List<SlabIncomeTaxModel> getAllSlabIncomeTaxByTaxYearId(int id,int slabTypeID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            if (slabTypeID > 0)
            {
                List<SlabIncomeTaxModel> slabIncomeTax = conn.Query<SlabIncomeTaxModel>("SELECT * FROM SlabIncomeTax WHERE TaxYearID=" + id + "And SlabTypeID=" + slabTypeID).ToList();
                return slabIncomeTax;
            }
            else { 
            List<SlabIncomeTaxModel> slabIncomeTax = conn.Query<SlabIncomeTaxModel>("SELECT * FROM SlabIncomeTax WHERE TaxYearID="+id).ToList();
            return slabIncomeTax;
            } 
        }

        public static List<SlabIncomeTaxModel> getAllSlabIncomeBySlabType(int id,int taxYearID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            if (taxYearID > 0)
            {
                List<SlabIncomeTaxModel> slabIncomeTaxBySlabId = conn.Query<SlabIncomeTaxModel>("SELECT * FROM SlabIncomeTax WHERE SlabTypeID=" + id + "and TaxYearID =" + taxYearID).ToList();
                return slabIncomeTaxBySlabId;
            }
            else
            {
                List<SlabIncomeTaxModel> slabIncomeTaxBySlabId = conn.Query<SlabIncomeTaxModel>("SELECT * FROM SlabIncomeTax WHERE SlabTypeID=" + id).ToList();
                return slabIncomeTaxBySlabId;
            } 
        }

        public static SlabIncomeTaxModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            SlabIncomeTaxModel slabIncomeTax = conn.QuerySingle<SlabIncomeTaxModel>("SELECT *FROM SlabIncomeTax WHERE ID=" + id);
            return slabIncomeTax;
        }
    }
}
