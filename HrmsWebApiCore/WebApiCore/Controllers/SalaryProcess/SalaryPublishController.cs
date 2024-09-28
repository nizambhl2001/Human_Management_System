using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SalaryPublishController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/salarypublish/comid/{comid}")]
        public IActionResult GetSalaryPublishList(int comid)
        {
            Response response = new Response("/salaryprocess/salarypublish/comid/{comid}");

            try
            {
                var result = SalaryPublish.getPublishList(comid);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarypublish/publishid/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/salaryprocess/salarypublish/publishid/{id}");

            try
            {
                var result = SalaryPublish.getById(id);
                if (result !=null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarypublish/saveorupdatepublishid")]
        public IActionResult SaveOrUpdate(SalaryPublishModel publishModel)
        {
            Response response = new Response("/salaryprocess/salarypublish/saveorupdatepublishid");
            
            try
            {
                if (publishModel.ID == 0) {
                    response.Status = SalaryPublish.saveOrUpdate(publishModel);
                    if (response.Status)
                    {
                        response.Result = "Publish Succesfully";
                    }
                    else
                    {
                        response.Result = "Failded To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = SalaryPublish.saveOrUpdate(publishModel);
                    if (response.Status)
                    {
                        response.Result = "Update Succesfully";
                    }
                    else
                    {
                        response.Result = "Failded To Update";
                    }
                    return Ok(response);
                }
                
            }
            catch (Exception ex)
            {

                response.Status = false;
                response.Result = ex.Message;
                return Ok(response);
            }
        }
    }
}