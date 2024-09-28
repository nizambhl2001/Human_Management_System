using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class EmpSeparationController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
      [ApiVersion("1")]
      [Route("api/v{version:apiVersion}/HR/emp/separation/insert")]
      public IActionResult InsertSeparation(EmpSeparationInfoModel separation)
        {
            Response response = new Response("/HR/emp/separation/insert");
            try
            {

                var result = EmpSeparationInfo.InsertSeparation(separation);
                if (result)
                {
                    if (separation.ID==null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail to save";
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
        [Route("api/v{version:apiVersion}/HR/emp/separation/getAll")]
        public IActionResult getAll()
        {
            Response response = new Response("/HR/emp/separation/getAll");
            try
            {
                var result = EmpSeparationInfo.getAll();
                if (result.Count > 0)
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpDelete]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/HR/emp/separation/delete/id/{id}")]
        public IActionResult delete(int id)
        {
            Response response = new Response("/HR/emp/separation/delete/id/"+id);
            try
            {
                var result = EmpSeparationInfo.Delete(id);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Delete Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To delete";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/HR/emp/separation/getById/id/{id}")]
        public IActionResult getById(int id)
        {
            Response response = new Response("/HR/emp/separation/getById/id/"+id);
            try
            {
                var result = EmpSeparationInfo.getById(id);
                if (result != null){
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }
    }
}