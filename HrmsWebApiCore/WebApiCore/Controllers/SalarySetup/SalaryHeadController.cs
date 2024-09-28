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
    public class SalaryHeadController : ControllerBase
    {
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryhead/getallsalarytype")]
        public IActionResult GetAllSalaryType()
        {
            Response response=new Response("/salarysetup/salaryhead/getallsalarytype");
            var result = SalaryHeadDb.GetAllSalaryType();
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
                    response.Result = "Data not found";
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
        [Route("api/v{version:apiVersion}/salarysetup/salaryhead/GetAll")]
        public IActionResult GetAll()
        {
            Response response = new Response("/salarysetup/salaryhead/GetAll");
            var restult = SalaryHeadDb.GetAll();
            try
            {
                if (restult.Count > 0)
                {
                    response.Status = true;
                    response.Result = restult;
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryhead/GetAllbyId/{id}")]
        public IActionResult GetAllbyId(int id)
        {
            Response response = new Response("/salarysetup/salaryhead/GetAllbyId/" + id);

            try
            {
                var restult = SalaryHeadDb.GetAllbyId(id);
                if (restult != null)
                {
                    response.Status = true;
                    response.Result = restult;
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
        [Route("api/v{version:apiVersion}/salarysetup/salaryhead/Save")]
        public IActionResult Save(SalaryHeadModel salaryhead)
        {
            Response response = new Response("/salarysetup/salaryhead/Save");
            try
            {
                response.Status = SalaryHeadDb.Save(salaryhead);
                if (response.Status)
                {

                    response.Result = "saved Succesfully";
                }
                else
                {

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

        [Authorize()]
        [HttpPut]
        [Route("api/v{version:apiVersion}/salarysetup/salaryhead/update")]
        public IActionResult Update(SalaryHeadModel salaryHead)
        {
            Response response = new Response("/salarysetup/salaryhead/update");
            try
            {
                response.Status = SalaryHeadDb.update(salaryHead);
                if (response.Status)
                {
                    response.Result = "Updated successfully!";
                }
                else
                {
                    response.Result = "Failed to update";
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
