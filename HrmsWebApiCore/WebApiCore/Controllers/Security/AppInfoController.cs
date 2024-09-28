using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using WebApiCore.DbContext.Security;
using WebApiCore.Helper;
using WebApiCore.Models.Security;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Security
{
    [ApiVersion("1")]
    [ApiController]
    public class AppInfoController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfiguration _config;
        public AppInfoController(IHostingEnvironment environment, IConfiguration config)
        {
            _hostingEnvironment = environment;
            _config = config;
        }

        //Application Module
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/appModule/save")]
        public IActionResult SaveorUpdateAppModule(AppModuleModel module)
        {
            Response response = new Response("/security/appModule/save");
            try
            {
                response.Status = AppInfoDb.SaveOrUpdateAppModule(module);
                response.Result = response.Status ? "Module Saved successfully!" : "Failed to save Module!";
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
        [Route("api/v{version:apiVersion}/security/appModule/get/id/{id:int?}")]
        public IActionResult GetAppModule(int? id)
        {
            Response response = new Response($"/security/appModule/get/id/{id}");
            try
            {
                List<AppModuleModel> modules = AppInfoDb.GetAppModules(id);
                response.Status = modules.Count > 0;
                response.Result = response.Status ? modules : (object)"No modules found!";
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
        [Route("api/v{version:apiVersion}/security/appModule/delete/id/{id}")]
        public IActionResult DeleteModule(int id)
        {
            Response response = new Response($"/security/appModule/delete/id/{id}");
            try
            {
                response.Status = AppInfoDb.DeleteModule(id);
                response.Result = response.Status ? "Module Deleted successfully!" : "Failed to Delete Module!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Application Page
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/appPage/save")]
        public IActionResult SaveorUpdateAppPage(AppPageModel page)
        {
            Response response = new Response("/security/appPage/save");
            try
            {
                response.Status = AppInfoDb.SaveOrUpdateAppPage(page);
                response.Result = response.Status ? "Page Saved successfully!" : "Failed to save Page!";
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
        [Route("api/v{version:apiVersion}/security/appPage/get/id/{id:int?}")]
        public IActionResult GetAppPage(int? id)
        {
            Response response = new Response($"/security/appPage/get/id/{id}");
            try
            {
                List<AppPageModel> pages = AppInfoDb.GetAppPages(id);
                response.Status = pages.Count > 0;
                response.Result = response.Status ? pages : (object)"No Page found!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/security/appPage/delete/id/{id}")]
        public IActionResult DeletePage(int id)
        {
            Response response = new Response($"/security/appPage/delete/id/{id}");
            try
            {
                response.Status = AppInfoDb.DeletePage(id);
                response.Result = response.Status ? "Page Deleted successfully!" : "Failed to Delete Page!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Assign Page
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/assignPage/role")]
        public IActionResult AssignPageInRole(AppPageAssignModel assignPages)
        {
            Response response = new Response("/security/assignPage/role");
            try
            {
                response.Status =
AppInfoDb.AssignPageInUser(assignPages);
                response.Result = response.Status ? "Page Assigned Successfully!" : "Failed to Assign Page!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/security/assignPage/user")]
        public IActionResult AssignPageInUser(AppPageAssignModel assignPages)
        {
            Response response = new Response("/security/assignPage/user");
            try
            {
                response.Status =
AppInfoDb.AssignPageInUser(assignPages);
                response.Result = response.Status ? "Page Assigned Successfully!" : "Failed to Assign Page!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/assignedPage/get/userTypeId/{userTypeId}/companyId/{companyId}")]
        public IActionResult GetAssignedPageByRole(int userTypeId, int companyId)
        {
            Response response = new Response($"/security/assignedPage/get/userTypeId/{userTypeId}/companyId/{companyId}");
            try
            {
                var assignedPages = AppInfoDb.GetAssignedPagesByUser(userTypeId, companyId);
                response.Status = assignedPages.Count > 0;
                response.Result = response.Status ? assignedPages : (object)"No page assigned yet!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/assignedPage/get/userId/{userId}/companyId/{companyId}")]
        public IActionResult GetAssignedPageByUser(int userId, int companyId)
        {
            Response response = new Response($"/security/assignedPage/get/userId/{userId}/companyId/{companyId}");
            try
            {
                var assignedPages = AppInfoDb.GetAssignedPagesByUser(userId, companyId);
                response.Status = assignedPages.Count > 0;
                response.Result = response.Status ? assignedPages : (object)"No page assigned yet!";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }


        [ApiVersion("1")]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/backup")]
        public IActionResult BackupDb()
        {
            Response response = new Response();
            try
            {
                string backupPath = _config["SqlServer:BackupPath"] ?? _hostingEnvironment.ContentRootPath + "/DbBackup/";
                string filePath = AppInfoDb.BackUpDatabase(backupPath, _config["SqlServer:Database"]);
                response.Status = (filePath == null) ? false : true;
                response.Result = filePath;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //[Authorize()]
        [ApiVersion("1")]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/backup/download")]
        public IActionResult GetDbBackupFile(string filePath)
        {
            if (filePath == null || filePath == "undefined")
            {
                return BadRequest("File Not found!");
            }
            var bytes = System.IO.File.ReadAllBytes(filePath);
            var stream = new MemoryStream(bytes);
            var fileName = Path.GetFileName(filePath);
            new FileExtensionContentTypeProvider().TryGetContentType(filePath, out string mimeType);
            return File(stream, mimeType ?? "application/octet-stream", fileName);
        }
        
        [ApiVersion("1")]
        [HttpGet]
        [Route("api/v{version:apiVersion}/security/backup/check")]
        public IActionResult CheckTodaysBackup()
        {
            try
            {
                string backupPath = _config["SqlServer:BackupPath"] ?? _hostingEnvironment.ContentRootPath + "/DbBackup/";
                DirectoryInfo fileDir = new DirectoryInfo(backupPath);
                bool isBackup = fileDir.GetFiles()
                    .Any(c => c.CreationTime.ToString("yyyyMMdd") == DateTime.Now.ToString("yyyyMMdd"));
                return Ok(isBackup);
            }
            catch(Exception)
            {
                return Ok(false);
            }
        }
    }
}