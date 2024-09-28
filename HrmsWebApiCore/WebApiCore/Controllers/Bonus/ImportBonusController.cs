using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Bonus;
using WebApiCore.Helper;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Bonus
{
    [Authorize()]
    [ApiController]
    public class ImportBonusController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly FileOperation _fileOperation;
        public ImportBonusController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
            _fileOperation = new FileOperation();
        }
        [Authorize()]
        [HttpPost, ApiVersion("1")]
        [Route("api/v{version:apiVersion}/bonus/import")]
        public IActionResult Import()
        {
            var reqParam = HttpContext.Request.Query;
            List<IFormFile> excelFiles = HttpContext.Request.Form.Files.ToList();
            Response response = new Response("/bonus/import");
            try
            {
                ImportBonusModel model = new ImportBonusModel {
                    ID = Convert.ToInt32(reqParam["ID"]),
                    CompanyID = Convert.ToInt32(reqParam["CompanyID"]),
                    Grade = Convert.ToInt32(reqParam["Grade"]),
                    SalaryHead = Convert.ToInt32(reqParam["SalaryHead"]),
                    BonusType = Convert.ToInt32(reqParam["BonusType"]),
                    PeriodID = Convert.ToInt32(reqParam["PeriodID"]),
                    PeriodName = reqParam["PeriodName"],
                };
                List<dynamic> excelData = _fileOperation.UploadExcelFile(excelFiles, _hostingEnvironment.ContentRootPath, 1, 1);
                response.Status = ImportBonus.ImportData(model, excelData);
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
        [Route("api/v{version:apiVersion}/festival/bonus/delete/bonus")]
        public IActionResult deleteBonous(ImportBonusModel bonus)
        {
            Response response = new Response("/festival/bonus/upload/bonus");
            var result = ImportBonus.DeleteExistingBonus(bonus);
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