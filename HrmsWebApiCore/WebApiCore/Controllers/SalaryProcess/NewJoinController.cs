using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class NewJoinController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/getjoininginfo/")]
        public IActionResult GetNewJoiningInfo()
        {
            Response response = new Response("/salaryprocess/getjoininginfo/");
            try
            {
                var reqParam = HttpContext.Request.Query;
                int grade = Convert.ToInt32(reqParam["grade"]);
                DateTime sDate = Convert.ToDateTime(reqParam["sDate"]);
                DateTime eDate = Convert.ToDateTime(reqParam["eDate"]);
                int comid = Convert.ToInt32(reqParam["companyId"]);


                var result = NewJoin.getNewJoiningInfo(grade,sDate,eDate,comid);
                if (result.Count>0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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