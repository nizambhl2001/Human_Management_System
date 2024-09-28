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
    public class EmployeeExtraSalaryController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/empextrasalary/search")]
        public IActionResult GetEmpExtraSalaryList(EmployeeExtraSalaryModel extraSalaryModel)
        {
            Response response = new Response("/salaryprocess/empextrasalary");

            try
            {
                var result = EmployeeExtraSalary.GetOtherPayment(extraSalaryModel);
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


        // Save Employee Extra Salary 
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/empextrasalary/save")]
        public IActionResult SaveEmpExtraSalary(EmployeeExtraSalaryModel extraSalaryModel)
        {
            Response response = new Response("/salaryprocess/empextrasalary/save");

            try
            {
                response.Status = EmployeeExtraSalary.SaveEmpExtraSalary(extraSalaryModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Save";
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