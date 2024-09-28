using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Property;

namespace WebApiCore.DbContext.Property
{
    public class PropertyAssign
    {
        public static bool SaveUpdate(PropertyAssignModel propertyAssign)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                propertyAssign.ID,
                propertyAssign.EmpCode,
                propertyAssign.ReciveFrom,
                propertyAssign.PropertyID,
                propertyAssign.ModelID,
                propertyAssign.AssainDate,
                propertyAssign.AssainType,
                propertyAssign.Status,
                propertyAssign.CompanyID,
                propertyAssign.OwnershipDate
            };
            int rowAffect = conn.Execute("INSertAssetAssain", param: param, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }

        public static List<PropertyCatagoryModel> getAll()
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetAssain").ToList();
            return dataset;
        }
        public static bool Delete(int id)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var rowAffect = conn.Execute("DELETE FROM AssetAssain WHERE ID=" + id);
            return rowAffect > 0;
        }

        public static PropertyAssignModel GetEmpById(string empCode, int compId)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<PropertyAssignModel>("SELECT CompanyID,EmpCode, EmpName, Department, Designation FROM View_EmployeeAll WHERE EmpCode='" + empCode+"'And CompanyID="+compId);
            return data;
        }

        public static PropertyAssignModel GetAssignById(string empCode,int compId)
        {
         var conn=new SqlConnection(Connection.ConnectionString());
         var data = conn.QuerySingle<PropertyAssignModel>("SELECT * FROM AssetAssain WHERE EmpCode='"+empCode+"'AND CompanyID="+compId);
         return data;
        }

        public static PropertyAssignModel GetFromEmpById(string empCode, int compId)
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var data = conn.QuerySingle<PropertyAssignModel>("SELECT CompanyID,EmpCode, EmpName, Department, Designation FROM View_EmployeeAll WHERE EmpCode='" + empCode + "'And CompanyID=" + compId);
            return data;
        }
        public static PropertyAssignModel GetAssainAssetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var catagory = conn.QuerySingle<PropertyAssignModel>("SELECT * FROM AssetAssain WHERE ID=" + id);
            return catagory;
        }

        //Author Ashiq
        public static List<PropertyAssignModel> GetAssignedAsset(string empCode, int compId)
        {
                var conn = new SqlConnection(Connection.ConnectionString());
                var assets = conn.Query<PropertyAssignModel>("SELECT    dbo.AssetAssain.ID, dbo.AssetAssain.OwnershipDate, dbo.AssetAssain.EmpCode, dbo.AssetAssain.ReciveFrom, dbo.AssetAssain.PropertyID, dbo.AssetAssain.ModelID, dbo.AssetAssain.AssainDate,dbo.AssetAssain.AssainType, dbo.AssetAssain.Status, dbo.AssetAssain.CompanyID, dbo.AssetSetup.Model, dbo.AssetSetup.Serial,dbo.AssetSetup.Confiruration FROM         dbo.AssetAssain INNER JOIN dbo.AssetSetup ON dbo.AssetAssain.ModelID = dbo.AssetSetup.ID WHERE dbo.AssetAssain.EmpCode = '" + empCode+"' AND Dbo.AssetAssain.CompanyID = "+compId+" ORDER BY dbo.AssetAssain.ID DESC").ToList();
                return assets;
            
        }
        
    }
        
    }

