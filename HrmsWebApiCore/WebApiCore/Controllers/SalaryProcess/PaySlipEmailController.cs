using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels;
using WebApiCore.DbContext.SalaryProcess;
using Microsoft.AspNetCore.Authorization;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class PaySlipEmailController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/payslipemail/processpayslip")]
        public IActionResult ProcessPaySlip(PaySlipToEmailModel paySlipModel)
        {
            Response response = new Response("/salaryprocess/payslipemail/processpayslip");
            try
            {

                var result = PaySlipToEmail.processPaySlip(paySlipModel);
                if (result > 0)
                {
                    response.Status = true;
                    response.Result = "Pay Slip Process";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to Pay Slip Process";
                }
                return Ok(response);
            }
            catch (Exception ex)
            {

                response.Status = false;
                response.Result = ex.Message;
                return Ok(response);
            }
        }
    }
}