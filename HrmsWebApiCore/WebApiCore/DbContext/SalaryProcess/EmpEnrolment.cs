using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class EmpEnrolment
    {

        public static List<SalaryGradePayScale> payScaleList(string gradename)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT ID, GradeValue, CompanyID, GradeName +'-'+ CAST(GradeSerial as nvarchar)+'--'+cast(Basic as nvarchar) as GradeName FROM SalaryGrade WHERE GradeName='{gradename}'";
            List<SalaryGradePayScale> payList = conn.Query<SalaryGradePayScale>(quire).ToList();
            return payList;
        }

        public static bool saveUpdate(EmpEnrolmentModel enrolmentModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
       
                if (enrolmentModel.ID == 0)
                {
                    enrolmentModel.ActionType = 1;
                }
                else
                {
                    enrolmentModel.ActionType = 2;
                    enrolmentModel.BankUpdate = enrolmentModel.Bank;
                }
                var obj = new
                {

                    enrolmentModel.ActionType,
                    enrolmentModel.EmpCode,
                    enrolmentModel.Bank,
                    enrolmentModel.BankUpdate,
                    enrolmentModel.BankBranch,
                    enrolmentModel.AccountNo,
                    enrolmentModel.AccountName,
                    enrolmentModel.Payby,
                    enrolmentModel.IncomeTax,
                    enrolmentModel.TaxDeductAmount,
                    enrolmentModel.ProvidentFund,
                    enrolmentModel.CompanyID,
                    enrolmentModel.PayScaleID,
                    enrolmentModel.Taxpaybycompany,
                    enrolmentModel.EffectivePeriodID
                };
                int rowAffected = conn.Execute("sp_Enrolment_IU", param: obj, commandType: CommandType.StoredProcedure);
                return rowAffected > 0;
            
            
        }
        public static List<object> enrolmentDuplicateCheck(string empCode,int bank,int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode =empCode,
                Bank =bank,
                CompanyID=comid
            };
            List<object> result = conn.Query<object>("sp_Enrolment_Duplicate", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }


       public static List<EmpEnrolmentViewModel> getById(string empCode, int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode=empCode,
                CompanyID=comId
            };

            List<EmpEnrolmentViewModel> empEnrolment = conn.Query<EmpEnrolmentViewModel>("sp_GetEnrolment", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return empEnrolment;
        }
       public static List<EmpEnrolmentViewModel> GetEnrolments(int comId,string empCode="-1", int gradeVal=-1, int departmentId=-1)
        {
            using (var conn = new SqlConnection(Connection.ConnectionString()))
            {
                var obj = new
                {
                    EmpCode = empCode,
                    GradeValue = gradeVal,
                    DepartmentID = departmentId,
                    CompanyID = comId
                };

                List<EmpEnrolmentViewModel> empEnrolment = conn.Query<EmpEnrolmentViewModel>("sp_GetEnrolmentDeptGradeWise", param: obj, commandType: CommandType.StoredProcedure).ToList();
                return empEnrolment;
            }
        }

        public static EmpEnrolmentModel GetByIdEdit(int id, string empcode)
        {
            
            var conn = new SqlConnection(Connection.ConnectionString());
            EmpEnrolmentModel empList = conn.QuerySingle<EmpEnrolmentModel>($"SELECT * FROM EmpEnrolment WHERE  ID ={id} And EmpCode='{empcode}'");
            return empList;
        }
    }

    
}
