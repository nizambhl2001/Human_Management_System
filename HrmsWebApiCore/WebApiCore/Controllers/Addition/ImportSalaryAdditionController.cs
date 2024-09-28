using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.Helper;
using WebApiCore.Models.Addition;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Addition
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ImportSalaryAdditionController : ControllerBase
    {

        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly FileOperation _fileOperation;
        public ImportSalaryAdditionController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
            _fileOperation = new FileOperation();
        }

        [Authorize()]
        [HttpPost, ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Addtion/Salary/import")]
        public IActionResult ImportSalary()
        {
            var reqParam = HttpContext.Request.Query;
            var excelFiles = HttpContext.Request.Form.Files.ToList();
            Response response = new Response("/Addtion/Salary/import");
            try
            {
                ImportAdditionModel model = new ImportAdditionModel
                {
                    ID = Convert.ToInt32(reqParam["ID"]),
                    CompanyID = Convert.ToInt32(reqParam["CompanyID"]),
                    Grade = Convert.ToInt32(reqParam["Grade"]),
                    SalaryHead = Convert.ToInt32(reqParam["SalaryHead"]),
                    PeriodID = Convert.ToInt32(reqParam["PeriodID"]),
                    PeriodName = reqParam["PeriodName"],
                };
                List<dynamic> excelData = _fileOperation.UploadExcelFile(excelFiles, _hostingEnvironment.ContentRootPath, 1, 1);
                response.Status = ImportAdditionDb.ImportData(model, excelData);
                if (response.Status)
                {
                    response.Result = "File Data Imported Successfully!";
                }
                else
                {
                    response.Result = "Failed to Import File and data!";
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
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Addtition/salary/delete/salary")]
        public IActionResult DeleteSalary(ImportAdditionModel salary)
        {
            Response response = new Response("/Addtition/salary/delete/salary");
            var result = ImportAdditionDb.DeleteExistingSalaryImport(salary);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Delete Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To Delete";
                }
                return Ok(response.Result);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response.Result);
        }



    }
}