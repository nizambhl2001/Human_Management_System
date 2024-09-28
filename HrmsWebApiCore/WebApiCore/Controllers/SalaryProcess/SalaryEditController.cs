using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SalaryEditController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/salaryedit/getempsalaryupdate")]
        public IActionResult GetEmployeeSalaryUpdate(SalaryEditModel parammodel)
        {
            Response response = new Response("/salaryprocess/salaryedit/getempsalaryupdate");
            var result = SalaryEdit.getEmployeeSalaryUpdate(parammodel);
            try
            {
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

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/salaryedit/updatesalary")]
        public IActionResult UpdateSalry(SalaryEditModel parammodel)
        {
            Response response = new Response("/salaryprocess/salaryedit/getempsalaryupdate");
           response.Status = SalaryEdit.UpdateSalary(parammodel);
            try
            {
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Salary Update Successfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Salary Not Process";
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