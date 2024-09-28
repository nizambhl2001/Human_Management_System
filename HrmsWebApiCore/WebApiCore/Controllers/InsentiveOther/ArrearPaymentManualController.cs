using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Bonus;
using WebApiCore.DbContext.IncentiveOther;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.InsentiveOther
{
    [Authorize()]
    [ApiController]
    public class ArrearPaymentManualController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/arear/payment/manual")]
        public IActionResult Save(FestivalBonusModel bonus)
        {
            Response response = new Response("/arear/payment/manual");
            var result = ArrearPaymentManual.Save(bonus);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
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