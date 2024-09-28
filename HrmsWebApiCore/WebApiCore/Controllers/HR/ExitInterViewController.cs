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
    public class ExitInterViewController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/exit/interview/save")]
        public IActionResult Save(ExitInterviewModel interview)
        {
            Response response = new Response("/exit/interview/save");
            var result = ExitInterView.SaveExitInterview(interview);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To Save";
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