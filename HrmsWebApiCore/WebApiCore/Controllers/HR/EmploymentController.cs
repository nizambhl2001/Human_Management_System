using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.HR;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class EmploymentController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/get/empCode/{empCode}/companyId/{companyID}")]
        public IActionResult GetEmployment(string empCode, int companyID)
        {
            Response response = new Response("api/v{version:apiVersion}/hr/employment/get/empCode/" + empCode + "/companyId/" + companyID);
            try
            {
                var result = Employment.GetEmployment(empCode, companyID);
                if (result!= null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/saveupdate")]
        public IActionResult SaveUpdate(EmploymentViewModel employment)
        {
            Response response = new Response("api/v{version:apiVersion}/hr/employment/saveupdate");
            try
            {
                if (employment.ID == 0)
                {
                    bool result = Employment.SaveUpdate(employment);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";
                        return Ok(response);
                    }
                }
                else
                {
                    bool result = Employment.SaveUpdate(employment);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                        return Ok(response);
                    }
                }
            }
            catch (Exception err)
            {
                response.Status = false;
                   response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/getbyid")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/hr/employment/getbyid");
            try
            {
                var result = Employment.GetById(id);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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

        [HttpDelete]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/delete/id/{id}")]
        public IActionResult Delete(int id)
        {
            Response response = new Response("/hr/employment/delete/id/" + id);
            try
            {
                var result = Employment.DeleteById(id);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Deleted succesfully!";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to delete";
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/getall")]
        public IActionResult GetAll()
        {
            Response response = new Response("/hr/employment/getall");
            try
            {
                var result = Employment.GetAll();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/basicInfo/get/compId/{compId}/grade/{gradeValue}")]
        public IActionResult GetAllEmpBasicInfo(int compId, int gradeValue)
        {
            Response response = new Response($"/hr/employment/basicInfo/get/compId/{compId}/grade/{gradeValue}");
            try
            {
                var result = Employment.GetAllEmpBasicInfo(compId, gradeValue);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/basicInfo/leave/get/compId/{compId}/grade/{gradeValue}")]
        public IActionResult GetAllEmpBasicInfoForLeave(int compId, int gradeValue)
        {
            Response response = new Response($"/hr/employment/basicInfo/leave/get/compId/{compId}/grade/{gradeValue}");
            try
            {
                var result = Employment.GetAllEmpBasicInfoForLeave(compId, gradeValue);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/get/reportTo/compId/{compId}")]
        public IActionResult GetReportToEmployee(int compId)
        {
            Response response = new Response($"/hr/employment/get/reportTo/compId/{compId}");
            try
            {
                var result = Employment.GetReportToEmployee(compId);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/saveupdate/jobDescription")]
        public IActionResult SaveUpdateJobDescription(JobDescriptionModel jobDescription )
        {
            Response response = new Response("api/v{version:apiVersion}/hr/employment/saveupdate/jobDescription");
            try
             {
                if (jobDescription.ID == 0)
                {
                    bool result = Employment.SaveUpdateJobDescription(jobDescription);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";
                        return Ok(response);
                    }
                }
                else
                {
                    bool result = Employment.SaveUpdateJobDescription(jobDescription);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                        return Ok(response);
                    }
                }
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/jobDescription/getbyEmpCode/empCode/{empCode}/compId/{compId}")]
        public IActionResult GetJobDescriptionByEmpCode(string empCode,int compId)
        {
            Response response = new Response($"/hr/employment/jobDescription/getbyEmpCode/empCode/{empCode}/compId/{compId}");
            try
            {
                var result = Employment.getJobDescriptionByEmpCode(empCode,compId);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/userInfo/get/compId/{compId}/loginID/{loginID}")]
        public IActionResult GetuserInfo(int compId, string loginID)
        {
            Response response = new Response($"/hr/employment/userInfo/get/compId/{compId}/loginID/{loginID}");
            try
            {
                var result = Employment.GetuserInfo(compId, loginID);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/basicInfo/get/compId/{compId}/grade/{gradeValue}/userId/{userId}")]
        public IActionResult getAllEmpBasicInfoByuserType(int compId, int gradeValue,int userId)
        {
            Response response = new Response($"/hr/employment/basicInfo/get/compId/{compId}/grade/{gradeValue}/userId/{userId}");
            try
            {
                var result = Employment.getAllEmpBasicInfoByuserType(compId, gradeValue, userId);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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




        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/employment/jobDescription/getby/id/{id}")]
        public IActionResult GetJobDescriptionById(int id)
        {
            Response response = new Response($"/hr/employment/jobDescription/getby/id/{id}");
            try
            {
                var result = Employment.getJobDescriptionById(id);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
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
    }
}