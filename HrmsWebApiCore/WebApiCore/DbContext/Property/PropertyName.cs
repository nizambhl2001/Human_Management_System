using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Property;

namespace WebApiCore.DbContext.Property
{
    public class PropertyName
    {
        public static bool Save(PropertyNameModel propname)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var categories = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetName WHERE AssetName='" + propname.AssetName + "'").ToList();
            if (categories.Count > 0)
            {
                throw new Exception(propname.AssetName + " already exist!");
            }
            int rowaffect = conn.Execute("INSERT INTO AssetName (ACateoryID,AssetName,Description,CompanyID) VALUES('" +
                                         propname.ACateoryID + "','" + propname.AssetName +
                                         "','"+propname.Description+"','"+1+"')");
            return rowaffect > 0;

        }
        public static List<PropertyNameModel> GetAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<PropertyNameModel>("SELECT * FROM AssetName").ToList();
            return (dataset);
        }
        public static PropertyNameModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var catagory = conn.QuerySingle<PropertyNameModel>("SELECT * FROM AssetName WHERE ID=" + id);
            return catagory;
        }
       
        public static List<PropertyNameModel> GetByCategory(int categoryId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var asset = conn.Query<PropertyNameModel>("SELECT * FROM AssetName WHERE ACateoryID=" + categoryId).ToList();
            return asset;
        }
        public static bool Delete(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var rowAffect = conn.Execute("DELETE AssetName WHERE ID=" + id);
            return rowAffect > 0;
        }
        public static bool Update(PropertyNameModel propCat)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var categories = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetName WHERE AssetName='" + propCat.AssetName + "' AND ID! =" + propCat.ID).ToList();
            if (categories.Count > 0)
            {
                throw new Exception(propCat.AssetName + " already exist!");
            }
            string sql = "UPDATE AssetName SET ACateoryID='" + propCat.ACateoryID + "', AssetName='" +
                         propCat.AssetName + "',Description='"+propCat.Description+"',CompanyID='"+propCat.CompanyID+"' WHERE ID=" + propCat.ID;

            int rowAffect = conn.Execute(sql);
            return rowAffect > 0;
        }
    }
}
