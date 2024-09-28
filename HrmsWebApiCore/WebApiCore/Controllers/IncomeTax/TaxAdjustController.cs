using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.IncomeTax;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class TaxAdjustController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/taxadjust/{taxid}/{userTypeId}/{comid}/{grade}")]
        public IActionResult saveTaxAdjust(int taxid,int userTypeId, int comid, int grade)
        {
            Response response = new Response("/incometax/taxadjust/{taxid}/{comid}/{grade}");
            try
            {
                
                    response.Status = TaxAdjust.saveTaxAdjust(taxid, userTypeId, comid,grade);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Adjust Success";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Faildes To Adjust";
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

    }
}