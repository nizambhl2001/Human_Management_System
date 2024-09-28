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
    public class SalaryViewController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/salaryview/getall/{empcode}/{grade}/{comid}/{salarytype}")]
        public IActionResult GetById(string empcode,int grade, int comid,int salarytype)
        {
            Response response = new Response("/salaryprocess/salaryview/getall/{empcode}/{grade}/{comid}/{salarytype}");
            
            try
            {
                var result = SalaryView.getSalaryView(empcode,grade, comid,salarytype);
                if (result.Count > 0)
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