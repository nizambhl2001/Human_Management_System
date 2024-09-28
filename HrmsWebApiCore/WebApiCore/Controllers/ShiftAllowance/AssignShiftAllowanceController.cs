using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRMS.DbContext.ShiftAllowance;
using HRMS.Models;
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
    public class AssignShiftAllowanceController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/shiftallowance/assignshiftallowance/save")]
        public IActionResult Save(AssignShiftAllowanceModel assignShift)
        {
            Response response = new Response("/shiftallowance/assignshiftallowance/save");
            try
            {
               
                    bool result = AssignShiftAllowance.saveTry(assignShift);
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

            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/shiftallowance/assignshiftallowance/getall")]
        public IActionResult GetAll(FilterModel filterModel)
        {
            Response response = new Response("/shiftallowance/assignshiftallowance/getall");
            try
            {
                var result = AssignShiftAllowance.GetAllAssignAllowance(filterModel);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }

        }

       
    }
}




