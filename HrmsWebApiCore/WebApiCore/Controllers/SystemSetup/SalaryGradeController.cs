using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SystemSetup
{
    [Authorize()]
    public class SalaryGradeController : ControllerBase
    {
    
        [HttpGet]
        [Route("api/v{version:apiVersion}/System/Setup/Salary/Grade/Get")]
        public IActionResult GetSalaryGrade()

        {
            Response response=new Response();
            var result = SalaryGrade.getAll();
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
                return Ok(response);
            }
        }
    }
}
