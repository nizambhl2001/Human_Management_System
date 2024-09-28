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
    public class EmpObjectiveInfoController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/objective/info/save/update/delete")]
        public IActionResult insertUpdateDelete(EmpObjectiveInfoModel objective)
        {
            Response response = new Response("/hr/objective/info/save/update/delete");
            try
            {
                var result = EmpObjectiveInfo.insertUpdateDelete(objective);
                if (result)
                {
                    response.Status = true;
                    if (objective.pOptions == 1)
                    {
                        response.Result = "Save SuccessFully"; 
                    }
                    else 
                    if(objective.pOptions == 2)
                    {
                        response.Result = "Successfully Updated";
                    }
                    else 
                    if(objective.pOptions == 3)
                    {
                        response.Result = "Successfully Delete";
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/objective/info/getAll")]
        public IActionResult getAll()
        {
            Response response = new Response("/hr/objective/info/getAll");
            try
            {
                var result = EmpObjectiveInfo.getAllObjective();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data Found";
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
        [Route("api/v{version:apiVersion}/HR/emp/objective/getById/id/{id}")]
        public IActionResult getById(int id)
        {
            Response response = new Response("/HR/emp/objective/getById/id/" + id);
            try
            {
                var result = EmpObjectiveInfo.getById(id);
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