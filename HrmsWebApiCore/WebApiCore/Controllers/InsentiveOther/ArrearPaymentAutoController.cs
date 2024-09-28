using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.IncentiveOther;
using WebApiCore.Models.IncentiveOther;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.InsentiveOther
{
    [Authorize()]
    [ApiController]
    public class ArrearPaymentAutoController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/arrear/payment/auto/Save")]
        public IActionResult Save(ArrearpaymentAutoModel arrear)
        {
            Response response = new Response("/arrear/payment/auto/Save");
            var result = ArrearPaytmentAuto.Save(arrear);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Successfully Save";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To Save";
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