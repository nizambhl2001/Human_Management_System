using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.HR;
using WebApiCore.ViewModels.HR;

namespace WebApiCore.DbContext.HR
{
    public class EmpCompanyTransfer
    {
        public static EmpCompanyTransferModel GetCompanytransfer(string empCode, int companyID,int ptType)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dateset = conn.QuerySingle<EmpCompanyTransferModel>("SELECT  Top 1 * FROM EmpTransfer WHERE  EmpCode='" + empCode + "' AND CompanyID=" + companyID+" Order By ID DESC");
            return dateset;
        }




        public static bool SaveUpdate(EmpCompanyTransferModel companyTransfer)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var varperam = new
            {
                companyTransfer.ID,
                companyTransfer.EmpCode,
                companyTransfer.PreCompanyID,
                companyTransfer.PreDepartmentID,
                companyTransfer.PreProjectID,
                companyTransfer.PreDesignationID,
                companyTransfer.PreDivisionID,
                companyTransfer.PreBranchID,
                companyTransfer.PreUnit,
                companyTransfer.PreLocation,
                companyTransfer.PreGrade,
                companyTransfer.PrePayscaleGrade,
                companyTransfer.PasCompanyID,
                companyTransfer.PasDepartmentID,
                companyTransfer.PasProjectID,
                companyTransfer.PasDesignationID,
                companyTransfer.PasDivisionID,
                companyTransfer.PasBranchID,
                companyTransfer.PasUnit,
                companyTransfer.PasLocation,
                companyTransfer.PasGrade,
                companyTransfer.PasPayscaleGrade,
                companyTransfer.Note,
                companyTransfer.TransferDate,
                companyTransfer.TPType,
                companyTransfer.CompanyID,
                companyTransfer.jobresponsibilities,
                companyTransfer.PreAmount,
                companyTransfer.PasAmount,
                companyTransfer.PreSectionID,
                companyTransfer.PasSectionID
            };
            int rowAffect = conn.Execute("sp_EmpTransfer_Save",param:varperam,commandType:CommandType.StoredProcedure);
            return rowAffect > 0;
        }


        public static EmpCompanyTransferModel GetAllbyId(int id)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var result = con.QuerySingle<EmpCompanyTransferModel>("SELECT * FROM EmpTransfer where ID=" + id);
            return (result);
        }

        public static  List<TransferViweModel> View(string EmpCode,int TPType,int CompanyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                EmpCode,
                TPType,
                CompanyID 
            };
            var dataset=conn.Query<TransferViweModel>("spGetPromotionTransferList",param:peram,commandType:CommandType.StoredProcedure).ToList();
            return dataset;
        }


        public static List<TransferViweModel> GetAllTransferType(int CompanyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                
                CompanyID
            };
            var dataset = conn.Query<TransferViweModel>("spGetTransferType", param: peram, commandType: CommandType.StoredProcedure).ToList();
            return dataset;
        }
        public static EmpCompanyTransferModel getEmploymentSalaryDetails(string EmpCode, int CompanyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                CompanyID,
                EmpCode
            };
            var dataset = conn.QuerySingle<EmpCompanyTransferModel>("sp_EmpTransfer_List", param: peram, commandType: CommandType.StoredProcedure);
            return dataset;
        }
       
    }
}