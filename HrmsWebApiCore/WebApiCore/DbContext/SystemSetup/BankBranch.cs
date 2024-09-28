using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class BankBranch
    {
        public static List<BankBranchModel> getBankBranchList(int comid,int bankid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT dbo.Bank.Description AS BankName, dbo.BankBranch.Description, dbo.BankBranch.CompanyID, " +
                $"dbo.BankBranch.Address, dbo.BankBranch.BankID, dbo.BankBranch.ID, dbo.BankBranch.SortOrder FROM  dbo.BankBranch" +
                $" INNER JOIN dbo.Bank ON dbo.BankBranch.BankID = dbo.Bank.ID WHERE dbo.BankBranch.CompanyID={comid} AND dbo.BankBranch.BankID={bankid}";

            List<BankBranchModel> result = conn.Query<BankBranchModel>(quire).ToList();
            return result;

        }


        public static bool saveBankBranch(BankBranchModel branchModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO BankBranch (Description,Address,BankID,CompanyID) VALUES ('{branchModel.Description}','{branchModel.Address}',{branchModel.BankID},{branchModel.CompanyID})";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool updateBankBranch(BankBranchModel branchModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPDATE BankBranch SET Description='{branchModel.Description}',BankID={branchModel.BankID},Address='{branchModel.Address}',CompanyID={branchModel.CompanyID} WHERE ID={branchModel.ID}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static bool deleteBankBranck(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE BankBranch WHERE ID={id}";
            int result = conn.Execute(quire);
            return result > 0;
        }

        public static BankBranchModel getByid(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM BankBranch WHERE ID={id}";
            BankBranchModel result = conn.QuerySingle<BankBranchModel>(quire);
            return result;
        }
    }
}
