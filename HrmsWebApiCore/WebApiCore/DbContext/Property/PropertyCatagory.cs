using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Models.Property;

namespace WebApiCore.DbContext.Property
{
    public class PropertyCatagory
    {
        public static bool Save(PropertyCatagoryModel propertyCatagory)
        {
            var conn = new SqlConnection(Connection.ConnectionString());

            var categories = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetCategory WHERE Categoryname='"+propertyCatagory.CategoryName+"'").ToList();
            if (categories.Count > 0)
            {
                throw new Exception(propertyCatagory.CategoryName+" already exist!");
            }
            int rowaffect = conn.Execute("INSERT INTO AssetCategory (Categoryname,Description) VALUES('" +
                                         propertyCatagory.CategoryName + "','" + propertyCatagory.Description +
                                         "')");
            return rowaffect > 0;

        }

        public static List<PropertyCatagoryModel> GetAll()
        {
            var conn=new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetCategory ORDER BY ID DESC").ToList();
            return (dataset);
        }

        public static PropertyCatagoryModel GetById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var catagory = conn.QuerySingle<PropertyCatagoryModel>("SELECT * FROM AssetCategory WHERE ID="+id);
            return catagory;
        }

        public static bool Delete(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var rowAffect = conn.Execute("DELETE AssetCategory WHERE ID=" + id);
            return rowAffect > 0;
        }

        public static bool Update(PropertyCatagoryModel propCat)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var categories = conn.Query<PropertyCatagoryModel>("SELECT * FROM AssetCategory WHERE Categoryname='" + propCat.CategoryName + "' AND ID! ="+propCat.Id).ToList();
            if (categories.Count > 0)
            {
                throw new Exception(propCat.CategoryName + " already exist!");
            }
            string sql = "UPDATE AssetCategory SET Categoryname='" + propCat.CategoryName + "', Description='" +
                         propCat.Description + "' WHERE ID=" + propCat.Id;
            int rowAffect = conn.Execute(sql);
            return rowAffect > 0;
        }

    }
}
