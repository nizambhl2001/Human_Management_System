using Dapper.Framework;
using HRMS.Models.IncomeTax;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HRMS.DbContext.IncomeTax
{
    public class TaxYearInfo
    {
        public static bool saveTaxYearInfo(TaxYearInfoModel taxYearInfoModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO TaxYearInfo(TaxYearName,StartDate,EndDate,TaxInfoID,SortOrder,CompanyID) VALUES ('{ taxYearInfoModel.TaxYearName }' ,'{ taxYearInfoModel.StartDate}'," +
                $" '{ taxYearInfoModel.EndDate}' , '{ taxYearInfoModel.TaxInfoID }', '{taxYearInfoModel.SortOrder}' , '{taxYearInfoModel.CompanyID }')";
            int rowAffected = conn.Execute(quire);
            return rowAffected>0;
        }

        public static List<TaxYearInfoModel> GetAllYear()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            List<TaxYearInfoModel> taxYearList = conn.Query<TaxYearInfoModel>("SELECT * FROM TaxYearInfo order by id desc").ToList();
            return taxYearList;
        }


        public static TaxYearInfoModel getByID(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                TaxYearInfoModel taxYearInfo = con.QuerySingle<TaxYearInfoModel>("SELECT * FROM TaxYearInfo WHERE ID=" + id);
                return taxYearInfo;
            }

        }

       

    }
}