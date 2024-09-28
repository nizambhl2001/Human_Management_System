using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using HRMS.DbContext.SalarySetup;
using HRMS.Models.SalarySetup;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.SalarySetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SalGradeController : ControllerBase
    {
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salgrade/getall")]
        public IActionResult GetAll()
        {
            Response response=new Response("/salarysetup/salgrade/getall");
            var result = SalaryGradeDb.GetSalaryGrade();
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
                    response.Result = "data not found";
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


        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salgrade/getallbyId/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/salarysetup/salgrade/getallbyId/" + id);
            try
            {
                var salaryyear = SalaryGradeDb.getSalGradeById(id);
                if (salaryyear != null)
                {
                    response.Status = true;
                    response.Result = salaryyear;
                }
                else
                {
                    response.Status = true;
                    response.Result = "No data found";
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
        [Route("api/v{version:apiVersion}/salarysetup/salgrade/save")]
        public IActionResult Save(SalGradeModel salgrade)
        {
            Response response = new Response("/salarysetup/salgrade/save");
            try
            {
                response.Status = SalaryGradeDb.SaveSalaryGrade(salgrade);
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
        [Authorize()]
        [Authorize()]
        [HttpPut]
        [Route("api/v{version:apiVersion}/salarysetup/salgrade/update")]
        public IActionResult Update(SalGradeModel saldrade)
        {
            Response response = new Response("/salarysetup/salgrade/update");
            try
            {
                response.Status = SalaryGradeDb.UpdateSalaryGrade(saldrade);
                if (response.Status)
                {
                    response.Result = "Updated successfully";
                }
                else
                {
                    response.Result = "Failed to update";
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

    }
}
