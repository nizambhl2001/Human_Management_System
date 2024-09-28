using System;
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
    public class ResignationLettreController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/Letter/save")]
        public IActionResult ResignationSave(ResignationLetterModel resignation)
        {
            Response response = new Response("/hr/resignation/Letter/save");
            try
            {
                var result = ResignationLettre.SaveLettre(resignation);
                if (result)
                {
                    if (resignation.ID == null)
                    {
                        {
                            response.Status = true;
                            response.Result = "Save Successfully";
                        }
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfull";
                    }
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/Letter/getById/id/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/hr/resignation/Letter/getById/{id}"+id);
            var result = ResignationLettre.getById(id);
            try
            {
                if (result!=null)
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
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/Letter/getAll")]
        public IActionResult getAll()
        {
            Response response = new Response("/hr/resignation/Letter/getAll");
            try
            {
                var result = ResignationLettre.getResignationLetter();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;

                }
                else
                {
                    response.Status = false;
                    response.Result = "No data Found";
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


        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/lettre/approve")]
        public IActionResult ResignationApprove()
        {
            var param = HttpContext.Request.Query;

            ResignationLetterModel status = new ResignationLetterModel()
            {
                ReqTo = param["ReqTo"],
                CompanyID = Convert.ToInt32(param["CompanyID"]),
            };
            Response response = new Response("/hr/resignation/lettre/approve");
            var result = ResignationLettre.getResignationLetter(status);
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
                    response.Result = "No data Found";
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

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/lettre/status")]
        public IActionResult ResignationLettreStatus(ResignationLetterModel model)
        {
            Response response = new Response("/hr/resignation/lettre/status");
            var result = ResignationLettre.NoticeLettreStatus(model);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "SuccessFully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/Notice/lettre/get")]
        public IActionResult NoticeLettreList()
        {
            var param = HttpContext.Request.Query;
            ResignationLetterModel status = new ResignationLetterModel()
            {
                GradeValue = Convert.ToInt32(param["GradeValue"]),
                CompanyID = Convert.ToInt32(param["CompanyID"]),
                Type=Convert.ToInt32(param["Type"]),
                EmpCode=param["EmpCode"],
            };
            Response response = new Response("/hr/resignation/Notice/lettre/get");
            var result = ResignationLettre.NoticeLettregetAll(status);
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
                    response.Result = "No data Found";
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/resignation/Letter/get/approveList")]
        public IActionResult getApproveList()
        {
            Response response = new Response("/hr/resignation/Letter/get/approveList");
            try
            {
                var result = ResignationLettre.ApproveLetter();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;

                }
                else
                {
                    response.Status = false;
                    response.Result = "No data Found";
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