using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalarySetup;
using WebApiCore.Models.SalarySetup;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalarySetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class OtherAllowanceController : ControllerBase
    {

        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/otherallowance/getAll/{gradeValue}")]
        public IActionResult GetAll(string gradeValue)
        {
            Response response = new Response("/salarysetup/otherallowance/getAll/"+gradeValue);
            var result = OtherAllowanceDB.getAll( gradeValue);
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
                    response.Result = "no data found";
                }

                return Ok(response);
            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salarysetup/otherallowance/save")]
        public IActionResult Save(OtherAllowanceModel otherAllw)
        {
            Response response = new Response("/salarysetup/otherallowance/save");
            try
            {
                response.Status = OtherAllowanceDB.save(otherAllw);
                if (response.Status)
                {
                    response.Result = "Saved Successfully";
                }
                else
                {
                    response.Result = "failed to save";
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