using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers
{
    [ApiController]
    public class DateOperationController : ControllerBase
    {
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Date/operation")]
        public IActionResult DateCalculate()
        {
            var reqParam = HttpContext.Request.Query;
            Response response = new Response("/Date/operation");
            try
            {
                var fromDate = Convert.ToDateTime(reqParam["fromDate"]);
                var toDate = Convert.ToDateTime(reqParam["toDate"]);
                var reasult = Helper.DateManipulate.DateDiff(fromDate, toDate);
                if (!(reasult==""))
                {
                    response.Status = true;
                    response.Result = reasult;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed";
                }
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }
    }
}