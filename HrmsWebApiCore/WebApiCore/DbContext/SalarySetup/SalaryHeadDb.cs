using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRMS.Models.SalarySetup;
using Dapper.Framework;
using System.Data.SqlClient;

namespace HRMS.DbContext.SalarySetup
{
    public class SalaryHeadDb
    {
        public static List<SalaryType> GetAllSalaryType()
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var result = con.Query<SalaryType>("Select * from SalaryType").ToList();
            return (result);

        }
        public static SalaryHeadModel GetAllbyId(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var result = con.QuerySingle<SalaryHeadModel>("SELECT * FROM SalaryHead where ID=" + id);
            return (result);
        }

       

        public static List<SalaryHeadModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<SalaryHeadModel>("SELECT * FROM SalaryHead ").ToList();
            return (dataset);
        }




        public static void AccountTypeID(SalaryHeadModel salHead)
        {
            switch (salHead.SalaryHeadType)
            {
                case "Addition":
                    salHead.AccountTypeID = 1;
                    break;
                default:
                    salHead.AccountTypeID = -1;
                    break;
            }
        }

        public static bool Save(SalaryHeadModel salaryHead)
        {

            var con = new SqlConnection(Connection.ConnectionString());
                AccountTypeID(salaryHead);
                
                int rowAffect = con.Execute("INSERT INTO SalaryHead ( AccountName,AccountCode,SalaryHeadType,AccountTypeID,CreatedDate,UpdatedDate,SortOrder,CompanyID,SLNo,IsIncomeTax,IsInvestments,Isaddordeduct) VALUES('" + salaryHead.AccountName + "','" + salaryHead.AccountCode + "','" + salaryHead.SalaryHeadType + "'," + salaryHead.AccountTypeID + ",'" + salaryHead.CreatedDate + "','" + salaryHead.UpdatedDate + "'," + salaryHead.SortOrder + "," + salaryHead.CompanyID + "," + salaryHead.SLNo + ",'" + salaryHead.IsIncomeTax + "','" + salaryHead.IsInvestments + "'," + salaryHead.Isaddordeduct + ")");
                return rowAffect > 0;
            
        }

        public static bool update(SalaryHeadModel salaryHead)
        {
            string sql = "UPDATE SalaryHead SET AccountName='" + salaryHead.AccountName+ "', AccountCode='" + salaryHead.AccountCode+ "',SalaryHeadType='" + salaryHead.SalaryHeadType+ "',AccountTypeID=" + salaryHead.AccountTypeID+ ",CreatedDate='" + salaryHead.CreatedDate+ "',UpdatedDate='" + salaryHead.UpdatedDate+ "',SortOrder=" + salaryHead.SortOrder+ ",CompanyID=" + salaryHead.CompanyID+ ",SLNo=" + salaryHead.SLNo+ ",IsIncomeTax='" + salaryHead.IsIncomeTax+ "',IsInvestments='" + salaryHead.IsInvestments+ "',Isaddordeduct=" + salaryHead.Isaddordeduct+ " WHERE ID =" + salaryHead.ID + "";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                AccountTypeID(salaryHead);

                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }



    }
}