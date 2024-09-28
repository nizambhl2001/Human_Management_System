using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Security;
using WebApiCore.ViewModels.Security;
using System.Data;
using System.Management;
using DocumentFormat.OpenXml.Drawing.Charts;
using System.Text;

namespace WebApiCore.DbContext.Security
{
    public class UserDb
    {
        public static UserViewModel Login(string loginId, string loginPassword)
        {
            object paramObj = new
            { 
                LoginID = loginId,
                LoginPassword = loginPassword
                //SoftwareArenaLtd2002
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                    try
                    {
                    UserViewModel user = con.Query<UserViewModel>("sp_UserLogin", param: paramObj, commandType: CommandType.StoredProcedure)
                    .Aggregate((u1, u2) => u1.UserTypeID > u2.UserTypeID ? u1 : u2);
                    // string sql = $"INSERT INTO UserLogInfo (UserID, LoginTime, LogoutTime, CompanyID) VALUES('{loginId}', FORMAT(GETDATE(), 'dd/MM/yyy hh:mm:ss ttt'),NULL, {user.CompanyID})";
                                     
                  var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_ComputerSystemProduct");
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        var digits = obj["UUID"].ToString();
                        byte[] byteArray = Encoding.Unicode.GetBytes(digits);

                        // 03D502E0 - 045E-0519 - DA06 - 080700080009
                        var step1 = digits.Substring(0,8); 
                        //var step2 = digits.Substring(9,4);
                        // const last4 = digits.Substring(digits.Length -4 - 11);
                        //const secondfour = digits.Substring(digits.Length -4 - 11);
                        // user.LoginDeviceId = step1+ "_Add_" + step2 + "_Add_" + digits.Substring(digits.Length - 12);
                        //  user.LoginDeviceId = digits.Substring(digits.Length - 14);
                        string sql = $"INSERT INTO UserLogInfo (UserID, LoginTime, LogoutTime, CompanyID) VALUES('{loginId}', CONVERT(char(10), GetDate(), 126),NULL, {user.CompanyID})";
                        con.Execute(sql);
                        break;
                    }                   
                        return user;
                    }
                    catch (Exception ex)
                    {
                    throw new Exception(ex.Message); 
                    }
            }
        }
        public static void Logout(string loginId)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                // string sql = $"UPDATE UserLogInfo SET LogoutTime = FORMAT(GETDATE(), 'dd/MM/yyyy hh:mm:ss ttt') WHERE ID = (SELECT TOP 1 ID FROM UserLogInfo WHERE UserID = '{loginId}' ORDER BY ID DESC)";
                string sql = $"UPDATE UserLogInfo SET LogoutTime =     CONVERT(char(10), GetDate(), 126) WHERE ID = (SELECT TOP 1 ID FROM UserLogInfo WHERE UserID = '{loginId}' ORDER BY ID DESC)";

                con.Execute(sql);
            }
        }
        public static bool ChangePassword(string loginId, string oldPassword, string newPassword)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                string checkExistUser = $" IF EXISTS (SELECT TOP 1 ID FROM Users WHERE LoginID = '{loginId}' AND LoginPassword = '{oldPassword}') SELECT TOP 1 ID FROM Users WHERE LoginID = '{loginId}' AND LoginPassword = '{oldPassword}' ELSE SELECT 0";
                int userId = con.ExecuteScalar<int>(checkExistUser);
                if (userId == 0) { throw new Exception("Incorrect User Name or Password"); }
                string sql = $"UPDATE Users SET LoginPassword='{newPassword}', IsChangedPassword='Yes' WHERE ID={userId}";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }
        // ========================== Create User ===============================
        public static List<UserViewModel> GetUsers(string filter)
        {
            string sqlQuire;
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                switch (filter)
                {

                    case "":
                        sqlQuire = string.Format(" SELECT  Users.ID, Users.EmpCode, Users.LoginID, dbo.Users.UserName+'---'+Users.LoginID as UserName, dbo.UserType.UserTypeName " +
                             " FROM Users INNER JOIN UserType ON dbo.Users.UserTypeID = dbo.UserType.ID WHERE Users.IsActive='Yes'");
                        break;
                    default:
                        sqlQuire = string.Format(@" SELECT  dbo.Users.ID, dbo.Users.EmpCode, dbo.Users.LoginID, dbo.Users.UserName+'---'+Users.LoginID as UserName, dbo.UserType.UserTypeName AS UserTypeName, dbo.Users.CompanyID FROM         dbo.Users INNER JOIN
                      dbo.UserType ON dbo.Users.UserTypeID = dbo.UserType.ID WHERE {0} AND dbo.Users.IsActive='Yes' ", filter);
                        break;

                }
                List<UserViewModel> result = con.Query<UserViewModel>(sqlQuire).ToList();
                return result;
            }
        }
        public static List<UserModel> GetUsersByEmpCode(string empCode)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"SELECT * FROM Users WHERE EmpCode='{empCode}'";
                List<UserModel> users = con.Query<UserModel>(sql).ToList();
                return users;
            }
        }
        public static UserModel GetUserForEdit(int Id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                UserModel Item = null;

                string quire = $"SELECT * FROM Users WHERE ID={Id}";

                Item = con.QuerySingle<UserModel>(quire);
                return Item;
            }
        }
        public static bool SaveCreateUser(UserModel userModel, SqlConnection connection=null, SqlTransaction transaction=null)
        {
            string quire = $"INSERT INTO Users(CompanyID,CreatedByID,EmpCode,UserName,LoginID,LoginPassword,UserTypeID,CreatedDate," +
                $"IsActive,GradeValue,Salarytype) VALUES" +
                $"({userModel.CompanyID},{userModel.CreatedByID = 0},'{userModel.EmpCode}','{userModel.UserName}','{userModel.LoginID}','{userModel.LoginPassword}',{userModel.UserTypeID}," +
                $"'{userModel.CreatedDate = DateTime.Now.ToShortDateString()}','{userModel.IsActive = "Yes"}'," +
                $"{userModel.GradeValue},{userModel.Salarytype = 0})";

            var con = connection ?? new SqlConnection(Connection.ConnectionString());
            
                int rowAffected = transaction==null ? con.Execute(quire): con.Execute(quire, transaction:transaction);
                return rowAffected > 0;
            
        }
        public static bool UpdateCreateUser(UserModel userModel)
        {
            string quire = $"UPDATE Users SET CompanyID={userModel.CompanyID},CreatedByID={userModel.CreatedByID},EmpCode='{userModel.EmpCode}',UserName='{userModel.UserName}'," +
                $"LoginID='{userModel.LoginID}',LoginPassword='{userModel.LoginPassword}',UserTypeID={userModel.UserTypeID},CreatedDate='{userModel.CreatedDate = DateTime.Now.ToShortDateString()}'," +
                $"IsActive='{userModel.IsActive}',GradeValue={userModel.GradeValue},Salarytype={userModel.Salarytype = 0} WHERE ID={userModel.ID}";

            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(quire);
                return rowAffected > 0;
            }
        }
        public static bool CheckDuplicateUser(UserModel userModel)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string quire = $"SELECT COUNT(ID) AS ID FROM Users WHERE LoginID ='{userModel.LoginID}'";
                var result = con.ExecuteScalar<int>(quire);
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        //=============================================== User Log History ===================================================================
        public static List<UserLogHistory> GetLogHistory(int historyType, int comId, int? userId)
        {
            var obj = new
            {
                HistoryType = historyType,
                UserID = userId ?? 0,
                CompanyID = comId
            };
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                List<UserLogHistory> result = con.Query<UserLogHistory>("spGetLogHistory", param: obj, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        
        //User Type
        public static List<UserTypeModel> GetAllUserType()
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sqlQuire = $"SELECT * FROM UserType ORDER BY SortOrder";
                List<UserTypeModel> result = con.Query<UserTypeModel>(sqlQuire).ToList();
                return result;
            }
        }
        public static bool CreateUserType(UserTypeModel userType)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = "";
                if (userType.ID > 0)
                {
                    sql = $"UPDATE UserType SET UserTypeName='{userType.UserTypeName}', SortOrder={userType.SortOrder ?? 0}, CompanyID={userType.CompanyID} WHERE ID={userType.ID}";
                }
                else
                {
                    sql = $"INSERT INTO UserType (UserTypeName, SortOrder, CompanyID) VALUES('{userType.UserTypeName}', {userType.SortOrder ?? 0}, {userType.CompanyID})";
                }
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }
        public static bool DeleteUserType(int id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"DELETE UserType WHERE ID = {id}";
                int rowAffect = con.Execute(sql);
                return rowAffect > 0;
            }
        }
        public static bool SalaryLockOrUnclock(SalaryLockModel model)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    LockDate = DateTime.Now.ToString("MM/dd/yyyy"),
                    model.SalaryPeriod,
                    model.EmpType,
                    model.UserID,
                    model.CompanyID,
                    Type = model.ActionType
                };
                int rowAffect = con.Execute("INSertSalaryLock", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        //Company
        public static bool SaveOrUpdateCompany(CompanyModel model)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("sp_CompanyInfo", param: model, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<CompanyModel> GetCompanies(){
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = "SELECT * FROM CompanyInfo";
                List<CompanyModel> companies = con.Query<CompanyModel>(sql).ToList();
                return companies;
            }
        }
    }
}
