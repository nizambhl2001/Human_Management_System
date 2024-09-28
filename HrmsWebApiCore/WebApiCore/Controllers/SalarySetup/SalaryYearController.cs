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
    public class SalaryYearController : ControllerBase
    {
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryyear/getAll")]
        public IActionResult GetAll()
        {
            Response response = new Response("/salarysetup/salaryyear/getAll");
            var result = SalaryYearDB.GetSalaryYear();
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

        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryyear/getById/{id}")]
        public IActionResult GetById(int id)
        {
            Response response= new Response("/salarysetup/salaryyear/getById/"+id);
            try
            {
                var salaryyear = SalaryYearDB.getSalaryYearById(id);
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salarysetup/salaryyear/save")]
        public IActionResult Save(SalaryYearModel salaryYear)
        {
            Response response=new Response("/salarysetup/salaryyear/save");
            try
            {
                response.Status = SalaryYearDB.SaveSalaryYear(salaryYear);
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
        [HttpPut]
        [Route("api/v{version:apiVersion}/salarysetup/salaryyear/update")]
        public IActionResult Update(SalaryYearModel salYear)
        {
            Response response=new Response("/salarysetup/salaryyear/update");
            try
            {
                response.Status = SalaryYearDB.UpdateSalary(salYear);
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


