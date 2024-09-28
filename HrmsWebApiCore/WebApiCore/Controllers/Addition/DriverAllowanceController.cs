using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Models.Addition;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.Addition
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class DriverAllowanceController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/addition/driverallowance/saveupdate")]
        public IActionResult SaveUpdate(DriverAllowanceModel driverallowance)
        {
            WebApiCore.ViewModels.Response response = new Response("/addition/driverallowance/saveupdate");
            try
            {
                if (driverallowance.ID == 0)
                {
                    bool result = DriverAllowanceDb.SaveUpdate(driverallowance);
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
                    bool result = DriverAllowanceDb.SaveUpdate(driverallowance);
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