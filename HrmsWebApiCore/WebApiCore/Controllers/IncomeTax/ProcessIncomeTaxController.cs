using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.IncomeTax;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ProcessIncomeTaxController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/processincometax/allname_code")]
        public IActionResult getAllEmpName_EmpCode()
        {
            Response response = new Response("incometax/processincometax/allname_code");
            var result = ProcessIncomeTax.getAllEmpNameEmpCode();
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

        // Pre Process Income Tax 
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incomeTax/preProcess")]
        public IActionResult PreProcessIncomeTax(ProcessIncomeTaxParametarModel incomeTaxParametarModel)
        {
            Response response = new Response("incometax/processincometax/preprocess");
            try
            {
                response.Status = ProcessIncomeTax.PreProcess(incomeTaxParametarModel);
                response.Result = response.Status ? "Ready to Process Tax" : "Failed To Pre-Process";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        // Process Income Tax
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incomeTax/process")]
        public IActionResult ProcesIncomeTax(ProcessIncomeTaxParametarModel incomeTaxProcessModel)
        {
            Response response = new Response("/incometax/processincometax/process");
            try
            {
                int processedEmployees = ProcessIncomeTax.Process(incomeTaxProcessModel);
                response.Status = processedEmployees>0;
                response.Result = response.Status?$"Tax Processed for {processedEmployees} employees":"Failed to Processed Tax!";
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
        [Route("api/v{version:apiVersion}/incomeTax/card/process")]
        public IActionResult ProcessTaxCard(TaxCardModel taxCard)
        {
            Response response = new Response("/incomeTax/card/process");
            try
            {
                    response.Status = ProcessIncomeTax.TaxCardProcess(taxCard);
                    response.Result = response.Status ? "Ready Tax Card" : "Failed To Ready Tax Card";
                    return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

    }
}