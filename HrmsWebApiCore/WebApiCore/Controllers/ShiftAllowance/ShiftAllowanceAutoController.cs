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
using WebApiCore.Models.ShiftAllowance;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.ShiftAllowance
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ShiftAllowanceAutoController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/shiftallowance/auto/save")]
        public IActionResult Save(ShiftAllowanceAutoModel autoshift)
        {
            Response response = new Response("/shiftallowance/auto/save");
            try
            {
                if (autoshift.ID == 0)
                {
                    response.Status = ShiftAllowanceAuto.AutoShiftSave(autoshift);
                    if (response.Status)
                    {
                        response.Result = " Inserted";
                    }
                    else
                    {
                        response.Result = "Failed to Insert ";
                    }
                }
                else
                {
                    response.Status = ShiftAllowanceAuto.AutoShiftSave(autoshift);
                    if (response.Status)
                    {
                        response.Result = " Updated";
                    }
                    else
                    {
                        response.Result = "Failed to Update ";
                    }
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
        [Route("api/v{version:apiVersion}/shiftallowance/auto/getall")]
        public IActionResult GetAll(ShiftAllowanceAutoParam autoshift)
        {
            Response response=new Response("/shiftallowance/auto/getall");
            try
            {
                var result = ShiftAllowanceAuto.GetAllAutoAllowance(autoshift);
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
            catch (Exception e)
            {

                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        

    }
}
