using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using Dapper.Framework;
using WebApiCore.ViewModels.SalaryProcess;
using WebApiCore.DbContext.IncomeTax;

namespace WebApiCore.DbContext.SalaryProcess
{
    public  class PaySlipToEmail
    {

        //public List<>

        public static void deleteExistingPayslip(PaySlipToEmailModel deleteExistPaySlipModel)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string quire = $"DELETE PayslipToEmail WHERE PeriodID ={deleteExistPaySlipModel.PeriodID} AND EmpCode ='{deleteExistPaySlipModel.EmpCode}'" +
                    $" AND CompanyID ={deleteExistPaySlipModel.CompanyID} ";
                var result = con.Execute(quire);
            }
        }


        // select Employee List

        public static List<PaySlipEmailViewModel> getEmloyeeList(PaySlipToEmailModel paySlipModel)
        {
            string quire = $"LEN(dbo.EmployeeInfo.EmailID) >6"+
                $" AND dbo.EmployeeInfo.EmpCode = '{paySlipModel.EmpCode}'  AND dbo.EmployeeInfo.CompanyID = {paySlipModel.CompanyID}   AND dbo.EmployeeInfo.Status = 'Active'  ";
           var result = ProcessIncomeTax.GetEmployees(quire);
           
            return result;
        }

        public static int processPaySlip(PaySlipToEmailModel paySlipEmailModel)
        {

            deleteExistingPayslip(paySlipEmailModel);
            var empList = getEmloyeeList(paySlipEmailModel);
            if (empList.Count > 0)
            {
                foreach (var item in empList)
                {
                    CreatePDF(paySlipEmailModel);
                }
            }
            
            return 1;
        }

        private static void CreatePDF(PaySlipToEmailModel pdfModel)
        {
            var con = new SqlConnection(Connection.ConnectionString());

           List<PaySlipToEmailModel>  psToemail = con.Query<PaySlipToEmailModel>("SELECT * FROM PayslipToEmail").ToList();
           
          psToemail.Add(pdfModel);





        }

    }
}
