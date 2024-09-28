using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Loan;
using WebApiCore.Models.Loan;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Loan
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class CashReceivedController : ControllerBase
    {
        [Authorize()]
        [HttpGet]

        [Route("api/v{version:apiVersion}/loan/cashreceived/get/empCode/{empCode}")]
        public IActionResult GetEmployeeLoanInfo(string empCode)
        {
            Response response = new Response("/loan/cashreceived/get/empCode/" + empCode);
            try
            {
                var result = CashReceivedDB.GetCashReceivedInfo(empCode);
                if (result != null)
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
       
        [Route("api/v{version:apiVersion}/loan/cashreceived/GetById/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/loan/cashreceived/GetById/" + id);
            try
            {
                var result = CashReceivedDB.GetCashReceivedbyID(id);
                if (result != null)
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/loan/cashreceived/saveupdate")]
        public IActionResult SaveUpdate(CashReceivedModel cashreceived)
        {
            Response response = new Response("api/v{version:apiVersion}/loan/cashreceived/saveupdate");
            try
            {
                if (cashreceived.id == 0)
                {
                    bool result = CashReceivedDB.SaveCashReceivedInfo(cashreceived);
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
                    bool result = CashReceivedDB.SaveCashReceivedInfo(cashreceived);
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