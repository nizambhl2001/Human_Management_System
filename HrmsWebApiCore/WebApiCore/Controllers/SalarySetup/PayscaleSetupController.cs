using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalarySetup;
using WebApiCore.Models.SalarySetup;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalarySetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class PayscaleSetupController : ControllerBase
    {

        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/payscalesetup/getAll/gradename/{gradeName}/compId/{companyID}")]
        public IActionResult GetAll(string gradeName, int companyID)
        {
            Response response=new Response("/salarysetup/payscalesetup/getAll/gradename/"+gradeName+ "/compId/"+companyID);
            var result = PayscaleSetupDB.getallpayscale(gradeName, companyID);
            try
            {
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data not found";
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
        [Route("api/v{version:apiVersion}/salarysetup/payscalesetup/saveupdate/{SpNo}")]
        public IActionResult SaveUpdate(PayscaleSetup payscalesetup,int SpNo)
        {
            Response response = new Response("/salarysetup/payscalesetup/saveupdate/"+SpNo);
            try
            {
                if (payscalesetup.ID == 0 & SpNo==1)
                {
                    bool result = PayscaleSetupDB.saveUpdatePayscalesetup(payscalesetup,SpNo);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";
                        return Ok(response);
                    }
                }
                else
                {
                    bool result = PayscaleSetupDB.saveUpdatePayscalesetup(payscalesetup, SpNo);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                        return Ok(response);
                    }
                }
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


