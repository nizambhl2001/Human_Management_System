using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper.Framework;
using System.Data;
using System.Data.SqlClient;
using WebApiCore.Models.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class PaysacleOutAddDeduct
    {

        public static List<PaysacleOutAddDeductModel> getGetEmpPaysacleOutAddDeduct(string empcode, int comid)
        {
            PaysacleOutAddDeductModel re = new PaysacleOutAddDeductModel();
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode = empcode,
                CompanyID = comid
            };
            List<PaysacleOutAddDeductModel> result = conn.Query<PaysacleOutAddDeductModel>("sp_GetEmpPaysacleOutAddDeduct", param:obj,commandType:CommandType.StoredProcedure).ToList();
           
            return  result;
        }

        public static bool savePayScaleAddDeduct(PaysacleOutAddDeductModel deductModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            if (deductModel.Allowancetype == -1 || deductModel.Allowancetype==2)
            {
                deductModel.Allowancetype = 2;
            }
            else
            {
                deductModel.Allowancetype = 1;
            }
            var obj = new
            {
                deductModel.EmpCode,
                deductModel.Amount,
                deductModel.StartDate,
                deductModel.EndDate,
                deductModel.SalaryHeadID,
                deductModel.Allowancetype,
                deductModel.CompanyID
            };

            int rowAffected = conn.Execute("sp_EmpPaySlipOutAddDeduct_Insert", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        public static bool updatePayScaleDeduct(PaysacleOutAddDeductModel deductModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            if (deductModel.Allowancetype == -1 || deductModel.Allowancetype==2)
            {
                deductModel.Allowancetype = 2;
            }
            else
            {
                deductModel.Allowancetype = 1;
            }
            var obj = new
            {
                deductModel.ID,
                deductModel.EmpCode,
                deductModel.Amount,
                deductModel.StartDate,
                deductModel.EndDate,
                deductModel.SalaryHeadID,
                deductModel.Allowancetype,
                deductModel.CompanyID
            };
            int rowAffected = conn.Execute("sp_EmpPaySlipOutAddDeduct_Update", param: obj, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        public static PaysacleOutAddDeductModel getById(int id,string empcode, int comid)
        {
           
            var conn = new SqlConnection(Connection.ConnectionString());
            //var obj = new
            //{
            //    ID=id,
            //    EmpCode = empcode,
            //    CompanyID = comid
            //};
            string quire = $"SELECT * FROM PaysacleOutAddDeduct WHERE ID='{id}' AND EmpCode='{empcode}' AND CompanyID='{comid}'";
            PaysacleOutAddDeductModel result = conn.QuerySingle<PaysacleOutAddDeductModel>(quire);

            return result;
        }

        public static bool deletePayscaleAddDeduct(int companyID, string empcode, int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                CompanyID=companyID,
                EmpCode=empcode,
                ID=id
            };
            int rowAffected = conn.Execute("spDeletePayScaleAddDeduct",param:obj,commandType:CommandType.StoredProcedure);
            return rowAffected > 0;
        }
    }
}
