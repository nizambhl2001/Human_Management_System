using System.Collections.Generic;
using System.Linq;
using Dapper.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Helper;

namespace WebApiCore.DbContext
{
    [ApiVersion("1")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly FileOperation _fileOperation;
        public HomeController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
            _fileOperation = new FileOperation();
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("api/v{version:apiVersion}/index")]
        public IActionResult Index()
        {
            bool isConnected = Connection.CheckConnection();
            return Ok("Congratulation! API running successfully... " + (isConnected ? "Database connected" : "Database not connected!"));
        }

        [HttpPost]
        [Authorize()]
        [Route("api/v{version:apiVersion}/file/upload")]
        public IActionResult FileUpload()
        {
            var postedFile = HttpContext.Request.Form.Files.ToList();

            List<dynamic> dataList = _fileOperation.UploadExcelFile(postedFile, _hostingEnvironment.ContentRootPath, 1, 1);

            return Ok(dataList);
        }

    }
}