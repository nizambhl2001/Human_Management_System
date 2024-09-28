using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class CasualDateOfJoiningController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/casual/date/joining/getById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/casual/date/joining/getById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = CasualJoiningDate.GetById(empCode, companyId);
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
                return Ok(response);
            }

        }
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/casual/date/joining/getDateById/empCode/{empCode}/companyId/{companyId}")]
        [HttpPost]
        public IActionResult GetDateById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/casual/date/joining/getDateById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = CasualJoiningDate.GetDateById(empCode, companyId);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found ";
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/casual/joining/date/save/update")]
        public IActionResult SaveUpdate(CasualJoiningDateModel casualjoin)
        {
            Response response = new Response("/home/hr/casual/joining/date/save/update");
            try
            {
                var result = CasualJoiningDate.SaveUpdate(casualjoin);
                if (result)
                    if (casualjoin.EmpCode == "")
                    {
                        {
                            response.Status = true;
                            response.Result = "Successfully Save";
                        }
                    }
                    else
                    {
                        {
                            response.Status = true;
                            response.Result = "Successfully Update";
                        }
                    }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
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