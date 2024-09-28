using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class IncomeTaxReturnController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/incometaxreturn/save")]
        public IActionResult saveIncomeTaxReturn(IncomeTaxReturnModel taxReturnModel)
        {
            Response response = new Response("incometax/incometaxreturn/save");
            try
            {
                response.Status = IncomeTaxReturn.saveIncomeTaxReturn(taxReturnModel);
                if (response.Status)
                {
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failded To Save";
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
        [Route("api/v{version:apiVersion}/incometax/incometaxreturn/checkincometaxreturn/{empCode}/{taxYearId}/{comId}")]
        public IActionResult CheckTaxReturn(string empCode, int taxYearID, int comId)
        {
            Response response = new Response("incometax/incometaxreturn/checkincometaxreturn");
            try
            {
               var result= IncomeTaxReturn.taxReturnCheckList(empCode, taxYearID, comId);
                if (result.Count>0)
                {
                    response.Result = "Already Submitted Income Tax Return";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Not Yet Submitted Income Tax Return";
                }return Ok(response);
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