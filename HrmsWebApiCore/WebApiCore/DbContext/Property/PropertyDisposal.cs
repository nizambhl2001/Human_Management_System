using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Property;

namespace WebApiCore.DbContext.Property
{
    public class PropertyDisposal
    {
        public static bool SaveUpdate(PropertyDisposalModel propertyDisposal)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                propertyDisposal.ID,
                propertyDisposal.EmpCode,
                propertyDisposal.PropertyID,
                propertyDisposal.ModelID,
                propertyDisposal.DisposeDate,
                propertyDisposal.DisType,
                propertyDisposal.Note,
                propertyDisposal.CompanyID
            };
            var rowAffect = conn.Execute("INSertAssetDispose", param: param, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<PropertyDisposalModel> GetAllByEmpCode(string empCode,int companyId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<PropertyDisposalModel>("SELECT * FROM AssetDispose WHERE EmpCode='"+ empCode+"'And CompanyID="+companyId).ToList();
            return (dataset);
        }

        public static PropertyDisposalModel GetById(string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var catagory = conn.QuerySingle<PropertyDisposalModel>("SELECT * FROM AssetDispose WHERE EmpCode=" + empCode);
            return catagory;
        }

        public static List<PropertyDisposalModel> GetEmpInfo(String empCode,int compId)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var data=conn.Query<PropertyDisposalModel>(
                @"SELECT     dbo.AssetDispose.ID, dbo.AssetDispose.EmpCode, dbo.AssetDispose.PropertyID, dbo.AssetDispose.ModelID, dbo.AssetDispose.DisposeDate,dbo.AssetDispose.DisType, dbo.AssetDispose.Note, dbo.AssetDispose.CompanyID, dbo.AssetSetup.Model, dbo.AssetSetup.Serial, dbo.AssetSetup.Confiruration 
                FROM dbo.AssetDispose
                INNER JOIN   dbo.AssetSetup ON dbo.AssetDispose.ModelID = dbo.AssetSetup.ID
                WHERE dbo.AssetDispose.EmpCode = '"+empCode+"' AND dbo.AssetDispose.CompanyID = "+compId+"" +
                "ORDER BY dbo.AssetDispose.ID DESC").ToList();
            return data;
        }

    }
}
