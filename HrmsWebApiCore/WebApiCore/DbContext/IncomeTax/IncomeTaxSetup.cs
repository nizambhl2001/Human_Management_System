using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class IncomeTaxSetup
    {
        public static List<IncomeTaxSetupModel> getAll(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            List<IncomeTaxSetupModel> setupModel = conn.Query<IncomeTaxSetupModel>($"select inc.ExempAmount,inc.ExempMaxAmount,inc.ExempPercent,inc.ExempRule,inc.ExempPercentOfID,inc.ID,inc.Exemption,"+
               " inc.SalaryHeadID, inc.SortOrder, inc.TaxYearID, inc.TaxYearName, inc.CompanyID, sl.AccountName from IncomeTaxSetup as inc join SalaryHead as sl on inc.SalaryHeadID = sl.id where inc.TaxYearID="+id).ToList();
            return setupModel;
        }


        public static bool saveTaxSetup(IncomeTaxSetupModel incomeTaxSetup)
        {
            //var salaryHed = incomeTaxSetup.ExempPercentOfID;
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO IncomeTaxSetup(SalaryHeadID,TaxYearID,TaxYearName,Exemption,ExempAmount,ExempPercent,ExempPercentOfID,ExempMaxAmount,ExempRule,CreatedDate,SortOrder,CompanyID)" +
                $" VALUES ('{incomeTaxSetup.SalaryHeadID}','{ incomeTaxSetup.TaxYearID }' ,'{ incomeTaxSetup.TaxYearName}','{ incomeTaxSetup.Exemption}' , '{ incomeTaxSetup.ExempAmount }'," +
                $" '{incomeTaxSetup.ExempPercent}' , '{incomeTaxSetup.ExempPercentOfID }','{incomeTaxSetup.ExempMaxAmount }','{incomeTaxSetup.ExempRule}','{incomeTaxSetup.CreatedDate}','{incomeTaxSetup.SortOrder }','{incomeTaxSetup.CompanyID}')";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool updateTaxSetup(IncomeTaxSetupModel incomeTaxSetup)
        {
            //var salaryHed = incomeTaxSetup.ExempPercentOfID;
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $" UPDATE IncomeTaxSetup SET SalaryHeadID='{incomeTaxSetup.SalaryHeadID}',TaxYearID='{ incomeTaxSetup.TaxYearID }',TaxYearName='{ incomeTaxSetup.TaxYearName}'," +
                $"Exemption='{ incomeTaxSetup.Exemption}',ExempAmount='{ incomeTaxSetup.ExempAmount }',ExempPercent='{incomeTaxSetup.ExempPercent}'," +
                $"ExempPercentOfID='{incomeTaxSetup.ExempPercentOfID }',ExempMaxAmount='{incomeTaxSetup.ExempMaxAmount }',ExempRule='{incomeTaxSetup.ExempRule}'," +
                $"CreatedDate='{incomeTaxSetup.CreatedDate}',SortOrder='{incomeTaxSetup.SortOrder }',CompanyID='{incomeTaxSetup.CompanyID}' WHERE ID={incomeTaxSetup.ID}";
               
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }



        public static IncomeTaxSetupModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            IncomeTaxSetupModel incomeTaxSetup = conn.QuerySingle<IncomeTaxSetupModel>($"select inc.ExempAmount,inc.ExempMaxAmount,inc.ExempPercent,inc.ExempRule,inc.ExempPercentOfID,inc.ID,inc.Exemption," +
               " inc.SalaryHeadID, inc.SortOrder, inc.TaxYearID, inc.TaxYearName, inc.CompanyID, sl.AccountName from IncomeTaxSetup as inc join SalaryHead as sl on inc.SalaryHeadID = sl.id where inc.ID=" + id);
            return incomeTaxSetup;
        }
    }
}
