using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{

    [Authorize()]
    [ApiController]
    public class JoiningInfoController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/Joining/info/saveOrUpdate")]
        public IActionResult SaveUpdate(JoiningInfoModel jim)
        {
            Response response = new Response("/hr/Joining/info/saveOrUpdate");
            try
            {
                var result = JoiningInfo.Save(jim);
                if (jim.id == null)
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "fail to Save";
                    }
                }
                else
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "fail to Update";
                    }
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
        [Route("api/v{version:apiVersion}/hr/Joining/info/get/by/empCode/{empCode}")]
        public IActionResult getByEmpCode(string empCode)
        {
            Response response = new Response("/hr/Joining/info/get/by/empCode/"+empCode);
            try
            {
                var result = JoiningInfo.getByEmpCode(empCode);
                if(result!=null)
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
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }
    }
}