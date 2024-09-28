using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Security;

namespace WebApiCore.DbContext.Security
{
    public class AppInfoDb
    {
        //Application Module
        public static bool SaveOrUpdateAppModule(AppModuleModel module)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = module.ID > 0 ? $"UPDATE ApplicationModules SET Name = '{module.Name}', ModuleRoutePath='{module.ModuleRoutePath}' WHERE ID={module.ID}"
                    : $"INSERT INTO ApplicationModules (Name, ModuleRoutePath) VALUES ('{module.Name}', '{module.ModuleRoutePath}')";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }
        public static List<AppModuleModel> GetAppModules(int? id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = (id == null || id == 0) ? "SELECT * FROM ApplicationModules" : $"SELECT * FROM ApplicationModules WHERE ID={id}";

                List<AppModuleModel> modules = con.Query<AppModuleModel>(sql).OrderBy(c => c.Name).ToList();
                foreach (AppModuleModel module in modules)
                {
                    module.Pages = GetAppPagesByModuleId(module.ID ?? 0);
                }
                return modules;
            }
        }
        public static bool DeleteModule(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"DELETE ApplicationModules WHERE ID = {id}";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }

        //Application Page
        public static bool SaveOrUpdateAppPage(AppPageModel page)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = page.ID > 0 ? $"UPDATE ApplicationPages SET Name = '{page.Name}', ModuleID={page.ModuleID}, PageRoutePath='{page.PageRoutePath}' WHERE ID={page.ID}"
                    : $"INSERT INTO ApplicationPages (ModuleID,Name,PageRoutePath) VALUES ({page.ModuleID},'{page.Name}', '{page.PageRoutePath}')";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }
        public static List<AppPageModel> GetAppPages(int? id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = (id == null || id == 0) ?
                    "SELECT page.ID, page.Name, page.PageRoutePath, page.ModuleID, mod.Name as ModuleName, mod.ModuleRoutePath FROM ApplicationPages as page JOIN ApplicationModules mod on mod.ID=page.ModuleID" :
                    $"SELECT  page.ID, page.Name,page.PageRoutePath, page.ModuleID, mod.Name as ModuleName,mod.ModuleRoutePath FROM ApplicationPages as page JOIN ApplicationModules mod on mod.ID=page.ModuleID WHERE page.ID={id}";
                List<AppPageModel> pages = con.Query<AppPageModel>(sql).ToList().OrderBy(c => c.Name).ToList();
                return pages;
            }
        }
        public static List<AppPageModel> GetAppPagesByModuleId(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"SELECT * FROM ApplicationPages WHERE ModuleID={id}";
                List<AppPageModel> pages = con.Query<AppPageModel>(sql).OrderBy(c => c.Name).ToList();
                return pages;
            }
        }

        public static bool DeletePage(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"DELETE ApplicationPages WHERE ID = {id}";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }

        //Assign Page in Role
        [Obsolete("Use Assigned page in user")]
        public static bool AssignPageInRole(AppPageAssignModel assignedPages)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        string deleteSql = $"DELETE AssignedPageRole WHERE UserTypeID={assignedPages.UserTypeID} AND CompanyID={assignedPages.CompanyID}";
                        con.Execute(deleteSql, transaction: tran);

                        foreach (AppModuleModel module in assignedPages.Modules)
                        {
                            foreach (AppPageModel page in module.Pages)
                            {
                                string insertSql = $"INSERT INTO AssignedPageRole (PageID, UserTypeID, CompanyID) VALUES({page.ID}, {assignedPages.UserTypeID}, {assignedPages.CompanyID})";
                                con.Execute(insertSql, transaction: tran);
                            }
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }
        public static bool AssignPageInUser(AppPageAssignModel assignedPages)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        string deleteSql = $"DELETE ApplicationUserAssignedPages WHERE UserID={assignedPages.UserID} AND CompanyID={assignedPages.CompanyID}";
                        con.Execute(deleteSql, transaction: tran);

                        foreach (AppModuleModel module in assignedPages.Modules)
                        {
                            foreach (AppPageModel page in module.Pages)
                            {
                                string insertSql = $"INSERT INTO ApplicationUserAssignedPages (PageID, UserID, CompanyID) VALUES({page.ID}, {assignedPages.UserID}, {assignedPages.CompanyID})";
                                con.Execute(insertSql, transaction: tran);
                            }
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }

        [Obsolete("Use Assigned page by user")]
        public static List<object> GetAssignedPagesByRole(int roleId, int companyId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $@"SELECT
  am.ID ModuleID,
am.ModuleRoutePath,
am.Name ModuleName,
  apr.PageID,
ap.PageRoutePath,
ap.Name PageName,
  apr.UserTypeID,
  apr.CompanyID
  FROM  AssignedPageRole apr
  JOIN ApplicationPages ap ON ap.ID = apr.PageID
  JOIN ApplicationModules am ON am.ID = ap.ModuleID WHERE UserTypeID={roleId} AND CompanyID={companyId}";
                var assignedPage = con.Query<object>(sql).ToList();
                return assignedPage;
            }
        }
        public static List<object> GetAssignedPagesByUser(int userId, int companyId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $@"SELECT
  am.ID ModuleID,
am.ModuleRoutePath,
am.Name ModuleName,
  apr.PageID,
ap.PageRoutePath,
ap.Name PageName,
  apr.UserID,
  apr.CompanyID
  FROM  ApplicationUserAssignedPages apr
  JOIN ApplicationPages ap ON ap.ID = apr.PageID
  JOIN ApplicationModules am ON am.ID = ap.ModuleID WHERE UserID={userId} AND CompanyID={companyId}";
                var assignedPage = con.Query<object>(sql).ToList();
                return assignedPage;
            }
        }
        public static string BackUpDatabase(string path, string dbName)
        {
            try
            {
                using (var con = new SqlConnection(Connection.ConnectionString()))
                {
                    string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + ".bak";
                    string sql = $"BACKUP DATABASE[{dbName}] TO DISK = '{path + fileName}'";
                    con.Execute(sql, commandTimeout:300);

                    DirectoryInfo dir = new DirectoryInfo(path);
                    foreach (var file in dir.GetFiles())
                    {
                        if (file.CreationTime.ToString("yyyyMMdd") != DateTime.Now.ToString("yyyyMMdd"))
                        {
                            file.Delete();
                        }
                    }
                    return path+fileName;
                }
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }

}
