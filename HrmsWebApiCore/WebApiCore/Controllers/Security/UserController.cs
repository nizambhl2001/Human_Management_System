using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using WebApiCore.DbContext.Security;
using WebApiCore.Models.Security;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Security;

namespace WebApiCore.Controllers.Security
{
    [Authorize]
    [ApiVersion("1")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        public UserController(IConfiguration config)
        {
            _config = config;
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("api/v{version:apiVersion}/user/login")]
        public IActionResult Login()
        {
            var reqParam = HttpContext.Request.Query;
            string loginId = reqParam["loginId"];
            string loginPassword = reqParam["loginPassword"];
            if (string.IsNullOrEmpty(loginId) || string.IsNullOrEmpty(loginPassword))
                return BadRequest();

            UserViewModel user = UserDb.Login(loginId, loginPassword);
            if (user == null)
            {
                return BadRequest();
            }
            user.AssignedPages = AppInfoDb.GetAssignedPagesByUser(user.ID, user.CompanyID);
            IdentityOptions _options = new IdentityOptions();
            var key = _config["Jwt:Key"];
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            int.TryParse(_config["Jwt:Expires"], out int days);
            var expires = DateTime.Now.AddDays(days);
            Claim[] claims = {
                new Claim("UserId", user.ID.ToString()),
                new Claim("LoginId", user.LoginID),
                new Claim("UserTypeId", user.UserTypeID.ToString()),
                new Claim("EmpCode", user.EmpCode.ToString()),
                new Claim("GradeValue", user.GradeValue.ToString()),
                new Claim("CompanyId", user.CompanyID.ToString()),
                new Claim("SalaryType", user.Salarytype.ToString()),
                new Claim("gender", user.gender.ToString()),
                new Claim(_options.ClaimsIdentity.RoleClaimType, user.UserTypeName.Replace(" ",""))
            };
            var token = new Token(key, issuer, audience, expires, claims);
            var tokenString = token.BuildToken();
            return Ok(new { token = tokenString, user });
        }
        [Authorize(Roles = "SuperAdmin,Admin,Manager,Employee,User")]
        [HttpGet]
        [Route("api/v{version:apiVersion}/user/logout")]
        public IActionResult Logout()
        {
            string loginId = HttpContext.Request.Query["loginId"];
            UserDb.Logout(loginId);
            return Ok();
        }

        [HttpPost]
        [Route("api/v{version:apiVersion}/user/changePassword")]
        public IActionResult ChangePassword([FromBody]JObject paramObj)
        {
            Response response = new Response("/user/changePassword");
            try
            {
                string loginId = paramObj["loginId"].ToString();
                string oldPassword = paramObj["oldPassword"].ToString();
                string newPassword = paramObj["newPassword"].ToString();
                response.Status = UserDb.ChangePassword(loginId, oldPassword, newPassword);
                response.Result = response.Status ? "Password Changed Successfully!" : "Failed to change Password";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        //============================================== Create User =======================================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/user/get/companyId/{companyId}")]
        public IActionResult GetUsers(int companyId)
        {
            string userTypes= HttpContext.Request.Query["userTypes"].ToString();
            string filter = userTypes.Length>0 ? $"UserTypeID IN ({userTypes})" : "UserTypeID NOT IN (9)";
            Response response = new Response($"/security/user/get/companyId/{companyId}/userTypes/");
            try
            {
                var result = UserDb.GetUsers(filter);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
                }
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpGet]
        [Route("api/v{version:apiVersion}/security/user/get/empCode/{empCode}")]
        public IActionResult GetUsersByEmpCode(string empCode)
        {
            Response response = new Response($"/security/user/get/empCode/{empCode}");
            try
            {
                List<UserModel> users = UserDb.GetUsersByEmpCode(empCode);
                response.Status = users.Count > 0;
                response.Result = response.Status ? users : (object)"No user found for this employee code";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        // Get User By ID For Edit
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/user/get/id/{id}")]
        public IActionResult GetByIdCreateUser(int id)
        {
            Response response = new Response($"/security/user/get/id/{id}");
            try
            {
                var result = UserDb.GetUserForEdit(id);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
                }
                return Ok(response);
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        //Save Create User

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/user/save")]
        public IActionResult SaveCreateUser(UserModel userModel)
        {
            Response response = new Response("/security/user/save");
            try
            {
                if (userModel.ID == 0)
                {
                    bool duplicateStatus = UserDb.CheckDuplicateUser(userModel);
                    if (duplicateStatus)
                    {
                        response.Status = false;
                        response.Result = "Login ID Already Exists";
                    }
                    else
                    {
                        response.Status = UserDb.SaveCreateUser(userModel);
                        if (response.Status)
                        {
                            response.Status = true;
                            response.Result = "Data Save Successfully";
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Failed To Save";
                        }
                    }

                    return Ok(response);
                }
                else
                {
                    response.Status = UserDb.UpdateCreateUser(userModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Data Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
                    return Ok(response);
                }
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Login History
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/logHistory/get/historyType/{historyType}/companyId/{companyId}/userId/{userId}")]
        public IActionResult GetLogHistory(int historyType, int companyId, int? userId = 0)
        {
            Response response = new Response("/security/logHistory/get/historyType/{historyType}/companyId/{companyId}/userId/{userId}");
            try
            {
                var result = UserDb.GetLogHistory(historyType, companyId, userId);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
                }
                return Ok(response);
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //User Type
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/userType/get")]
        public IActionResult GetAllUserTypeList()
        {
            Response response = new Response("/security/createuser/get_all_usertype");
            try
            {
                var result = UserDb.GetAllUserType();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
                }
                return Ok(response);
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/userType/create")]
        public IActionResult CreateUserType(UserTypeModel userType)
        {
            Response response = new Response("/security/userType/create");
            try
            {
                response.Status = UserDb.CreateUserType(userType);
                response.Result = response.Status ? ((userType.ID > 0) ? "User Type Updated" : "User Type Created Successfully!") : ((userType.ID > 0) ? "Failed to update" : "Failed to create new User Type");
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [HttpDelete]
        [Route("api/v{version:apiVersion}/security/userType/delete/{id}")]
        public IActionResult DeleteUserType(int id)
        {
            Response response = new Response($"/security/userType/delete/{id}");
            try
            {
                response.Status = UserDb.DeleteUserType(id);
                response.Result = (response.Status) ? "User  type deleted!" : "Failed to delete user type";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Salary Lock-Unlock
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/salaryLock")]
        public IActionResult LockOrUnlockSalary(SalaryLockModel lockerModel)
        {
            Response response = new Response("/security/salaryLock");
            try
            {
                response.Status = UserDb.SalaryLockOrUnclock(lockerModel);
                response.Result = response.Status ? "Success" : "Failed";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Company
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/company/save")]
        public IActionResult SaveOrUpdateCompany(CompanyModel model)
        {
            Response response = new Response("/security/company/save");
            try
            {
                response.Status = UserDb.SaveOrUpdateCompany(model);
                response.Result = response.Status ?
                    (model.ID > 0 ? "Company Updated Successfully" : "New Company Added Successfully") :
                    (model.ID > 0 ? "Failed to Update Company!" : "Failed to add new company!");
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpGet]
        [Route("api/v{version:apiVersion}/security/company/get")]
        public IActionResult GetAllCompany()
        {
            Response response = new Response("/security/company/get");
            try
            {
                List<CompanyModel> companies = UserDb.GetCompanies();
                response.Status = companies.Count > 0;
                response.Result = response.Status ? companies : (object)"No Company found";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
    }

}