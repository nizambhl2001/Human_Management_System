using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Models.SalarySetup;
using WebApiCore.Models.Loan;

namespace WebApiCore.DbContext.Loan
{
    public class EmployeeLoanInfoDb
    {
        public static EmployeeLoanInfo GetEmployeeLoanbyID( int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.QuerySingle<EmployeeLoanInfo>("SELECT * FROM EmpLoanandAdvance WHERE ID=" + id );
            return dateset;
        }
        public static List<EmployeeLoanInfo> GetEmployeeLoanInfo(string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.Query<EmployeeLoanInfo>("SELECT * FROM EmpLoanandAdvance WHERE EmpCode='" + empCode + "'").ToList();
            return dateset;
        }
        public static bool Save(EmployeeLoanInfo emploaninfo)
        {
            var ddmmyy = emploaninfo.LoanDate.Split("/");
            var year = ddmmyy[2].PadLeft(4,'0');
            var month = ddmmyy[0].PadLeft(2, '0');
            var day = ddmmyy[1].PadLeft(2, '0');
            var yyyymmdd = $"{year}{month}{day}";
            string sql = "insert into EmpLoanandAdvance (EmpCode,LoanDate,SalaryHeadID,InstallmentStart,LoanAmount,DownPayment,NetLoan,NoofInstallment,InstallmentType,Interest,Installmentamount, Remarks, CompanyID,DDMMYY) values ('"+ emploaninfo.EmpCode +"','"+ emploaninfo.LoanDate+"',"+emploaninfo.SalaryHeadID+","+emploaninfo.InstallmentStart+","+emploaninfo.LoanAmount+","+emploaninfo.DownPayment+","+emploaninfo.NetLoan+","+emploaninfo.NoofInstallment+","+emploaninfo.InstallmentType+","+emploaninfo.Interest+","+emploaninfo.Installmentamount+",'"+emploaninfo.Remarks+"',"+emploaninfo.CompanyID+","+ yyyymmdd+")";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }

        public static bool update(EmployeeLoanInfo emploaninfo)
        {
            var ddmmyy = emploaninfo.LoanDate.Split("/");
            var year = ddmmyy[2].PadLeft(4, '0');
            var month = ddmmyy[0].PadLeft(2, '0');
            var day = ddmmyy[1].PadLeft(2, '0');
            var yyyymmdd = $"{year}{month}{day}";
            string sql = $"Update EmpLoanandAdvance set EmpCode = '"+emploaninfo.EmpCode+"',LoanDate = '"+emploaninfo.LoanDate+"',SalaryHeadID = "+emploaninfo.SalaryHeadID+",InstallmentStart = "+emploaninfo.InstallmentStart+",LoanAmount = "+emploaninfo.LoanAmount+",DownPayment = "+emploaninfo.DownPayment+",NetLoan = "+emploaninfo.NetLoan+",NoofInstallment = "+emploaninfo.NoofInstallment+",InstallmentType = "+emploaninfo.InstallmentType+",Interest = "+emploaninfo.Interest+",Installmentamount = "+emploaninfo.Installmentamount+",Remarks = '"+emploaninfo.Remarks+"',CompanyID = "+emploaninfo.CompanyID+",DDMMYY = '"+ yyyymmdd + "' WHERE ID ="+emploaninfo.ID+"";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }

    }
}
