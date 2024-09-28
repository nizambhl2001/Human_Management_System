using HRMS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRMS.DbContext.SalarySetup;
using HRMS.Models.SalarySetup;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace HRMS.Controllers.SalarySetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    
    public class PayscaleController : ControllerBase
    {

        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/payscale/getall/compid/{companyId}/spNo/{spNo}")]
        public IActionResult GetAll(int companyId,int spNo)
        {
            Response response = new Response("/salarysetup/payscale/getall/compid/"+companyId+ "/spNo/"+spNo);
            try
            {
                var result = PayscaleGradeDb.getAllPayscale(companyId,spNo);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/payscale/getById/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/salarysetup/payscale/getById/" + id);
            try
            {
                var payscale = PayscaleGradeDb.getpayscaleId(id);
                if (payscale != null)
                {
                    response.Status = true;
                    response.Result = payscale;
                }
                else
                {
                    response.Status = true;
                    response.Result = "No data found";
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
        [Route("api/v{version:apiVersion}/salarysetup/payscale/saveupdate/spno/{spNo}")]
        public IActionResult SaveUpdate(PayscaleModel payscale,int spNo)
        {
            Response response = new Response("/salarysetup/payscale/saveupdate/spno/"+spNo);
            try
            {
                if (spNo==1 && payscale.ID == 0)
                {
                    bool result = PayscaleGradeDb.SaveUpdate(payscale,spNo);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                        return Ok(response);
                    }
                    
                    else 
                    {
                        response.Status = false;
                        response.Result = "Already Payscale Grade Exist";
                        return Ok(response);
                    }
                }
                else
                {
                    bool result = PayscaleGradeDb.SaveUpdate(payscale,spNo);
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
