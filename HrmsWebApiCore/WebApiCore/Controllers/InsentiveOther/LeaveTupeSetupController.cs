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
    public class LeaveTupeSetupController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Insentive/others/leave/type/setup/save")]
        public IActionResult Save(LeaveTypeSetupModel leave)
        {
            Response response = new Response("/Insentive/others/leave/type/setup/save");
            var result = LeaveTypeSetup.Save(leave);
            try
            {
                if (result)
                {
                    if (leave.ID == null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

  
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Insentive/others/leave/type/setup/getAll")]
        public IActionResult getAll()
        {
            var compID =Convert.ToInt32(HttpContext.Request.Query["CompanyID"]);
            var gradeValue = Convert.ToInt32(HttpContext.Request.Query["GradeValue"]);
            Response response = new Response("/Insentive/others/leave/type/setup/getAll");
            var result = LeaveTypeSetup.getAll(compID,gradeValue);
            try
            {
                if (result.Count>0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No Data Found";
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Insentive/others/leave/type/setup/getById/{id}")]
        public IActionResult getById(int id)
        {
            Response response = new Response("/Insentive/others/leave/type/setup/getById/"+id);
            var result = LeaveTypeSetup.GetById(id);
            try
            {
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No Data Found";
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