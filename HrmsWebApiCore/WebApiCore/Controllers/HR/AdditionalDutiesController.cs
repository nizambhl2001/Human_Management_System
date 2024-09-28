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
    public class AdditionalDutiesController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/addition/duty/saveOrUpdate")]
        public IActionResult SaveUpdate(EmpAdditionalDutyModel adm)
        {
            Response response = new Response("/hr/addition/duty/saveOrUpdate");
            try
            {
                var result = AdditionalDuties.SaveUpdate(adm);
                if (adm.pOptions == 1)
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "fail to Save";
                    }
                }
                else
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "fail to Update";
                    }
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

      
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/addition/duty/getAll")]
        public IActionResult getAll()
        {
            Response response = new Response("/hr/addition/duty/getAll");
            try
            {
                var result = AdditionalDuties.GetAll();
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
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
            
        }

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/addition/duty/getbyid/{id}")]
        public IActionResult CategoryGetById(int id)
        {
            Response response = new Response("/hr/addition/duty/getbyid/" + id);
            try
            {
                var result = AdditionalDuties.GetById(id);
                if (result != null)
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