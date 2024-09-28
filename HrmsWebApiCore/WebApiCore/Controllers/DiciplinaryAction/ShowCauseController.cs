using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRMS.DbContext.DiciplinaryAction;
using HRMS.Models.Diciplinary_Action;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.DiciplinaryAction
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ShowCauseController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/disciplinary/showcause/saveupdate")]
        public IActionResult SaveUpdate(ShowCase showCase)
        {
            Response response = new Response("api/disciplinary/showcause/saveupdate");
            try
            {
                if (showCase.ID == 0)
                {
                     response.Status = ShowCause.SaveShowCause(showCase);
                    if (response.Status)
                    {
                      
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
                    response.Status = ShowCause.SaveShowCause(showCase);
                    if (response.Status)
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
        [Route("api/v{version:apiVersion}/disciplinary/showcause/getall")]
        public IActionResult GetShowCause()
        {
            Response response = new Response("api/disciplinary/showcause/getall");
            var result = ShowCause.GetShowCases();
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
        [Route("api/v{version:apiVersion}/disciplinary/showcause/{id}")]
        public IActionResult GetByBankId(int id)
        {
            Response response = new Response("api/disciplinary/showcause/{id}"+ id);
            try
            {
                var bank = ShowCause.GetByShowCauseId(id);
                if (bank != null)
                {
                    response.Status = true;
                    response.Result = bank;
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/disciplinary/showcause/delete/{id}")]
        public IActionResult DeleteShowCause(int id)
        {
            Response response = new Response("api/disciplinary/showcause/delete/{id}" + id);
            try
            {
                response.Status = ShowCause.DeleteShowCause(id);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
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

    }
}
