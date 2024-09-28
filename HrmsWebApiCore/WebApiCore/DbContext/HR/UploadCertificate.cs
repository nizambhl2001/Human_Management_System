using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public class UploadCertificate
    {
        public static bool Insert(CertificateUpload upload)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                upload.EmpCode,
                upload.EducationLevelID,
                upload.CImage,
                upload.UserID,
                upload.CompanyID,
                upload.FileExtension
            };
            var rowAffect = conn.Execute("INSertEmpCertificate",param:peram,commandType:System.Data.CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<CertificateUpload> getByEmpCode(string EmpCode,int companyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                EmpCode,
                companyID
            };
            var dataset = conn.Query<CertificateUpload>("spGetEmpCertificate", param: peram, commandType: System.Data.CommandType.StoredProcedure).ToList();
            return dataset;
        }
        public static CertificateUpload getByID(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<CertificateUpload>("SELECT * FROM EmpCertificateUpload WHERE ID="+id);
            return dataset;
        }
        public static bool UploadDocuments(UploadDocumentModel document)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                document.ID,
                document.EmpCode,
                document.Name,
                document.type,
                document.DocumentType,
                document.data,
                document.Date,
                document.CompanyID,
                document.pOptions
            };
            var rowAffect = conn.Execute("sp_UploadDocument", param: peram, commandType: System.Data.CommandType.StoredProcedure);
            return rowAffect>0;
        }
        public static List<UploadDocumentModel> getAllDocumentByEmpCode(string EmpCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                EmpCode
            };
            var dataset = conn.Query<UploadDocumentModel>($"SELECT ud.ID, ud.EmpCode,ud.Name,ud.type,ud.data,ud.Date,udt.Description as DocumentTypeName,ud.CompanyID FROM UploadDocuments ud LEFT JOIN UploadDocumentsType udt ON udt.ID = ud.DocumentType WHERE Empcode='{ EmpCode}'").ToList();
            return dataset;
        }
    }
}
