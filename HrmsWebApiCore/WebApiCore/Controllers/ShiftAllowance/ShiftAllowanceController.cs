using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRMS.DbContext.ShiftAllowance;
using HRMS.Models.ShiftAllowance;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.ShiftAllowance
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ShiftAllowanceController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/shiftallowance/amountsetup/saveupdate")]
        public IActionResult SaveUpdate(ShiftAmountSetupModel amountsetup)
        {
            Response response=new Response("/shiftallowance/amountsetup/saveupdate");
            try
            {
                if (amountsetup.ID == 0)
                {
                    bool result = ShiftAmountSetup.Saveupdate(amountsetup);
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
                    bool result = ShiftAmountSetup.Saveupdate(amountsetup);
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


        [Authorize()]

        [HttpGet]
        [Route("api/v{version:apiVersion}/shiftallowance/amountsetup/GetShiftAllowaneAmount/getAll/compId/{companyId}/grade/{grade}/usertypeid/{userTypeID}")]
        public IActionResult getAll(int companyId, int grade,int userTypeID)
        {
            Response response = new Response("api/shiftallowance/amountsetup/GetShiftAllowaneAmount/getAll/compId/" + companyId + "/grade/" + grade+ "/usertypeid/"+userTypeID);
            try
            {
                var allowance = ShiftAmountSetup.GetShiftAllowaneAmount(companyId, grade,userTypeID);
                if (allowance.Count > 0)
                {
                    response.Status = true;
                    response.Result = allowance;
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




    }

        
}
