using HRMS.DbContext.DiciplinaryAction;
using HRMS.Models.DiciplinaryAction;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.DiciplinaryAction
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ShowCauseResultController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/disciplinary/showcauseresult/getall")]
        public IActionResult GetAllShowCauseResults()
        {
            Response response = new Response("api/disciplinary/showcauseresult/getall");
            var result = ShowCauseResults.GetAllShowCauseResult();
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


        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/disciplinary/showcauseresult/saveupdate")]
        public IActionResult SaveUpdateShowCauseResult(ShowCauseResultModel showCaseResult)
        {
            Response response = new Response("api/disciplinary/showcauseresult/saveupdate");
            try
            {
                if (showCaseResult.ID == 0)
                {
                    response.Status = ShowCauseResults.SaveShowCauseResult(showCaseResult);
                    if (response.Status)
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
                    response.Status = ShowCauseResults.SaveShowCauseResult(showCaseResult);
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
       
        [Route("api/v{version:apiVersion}/disciplinary/showcauseresult/{id}")]
        public IActionResult GetByBankId(int id)
        {
            Response response = new Response("api/disciplinary/showcauseresult/" + id);
            try
            {
                var causeResult = ShowCauseResults.GetByShowCauseResultId(id);
                if (causeResult != null)
                {
                    response.Status = true;
                    response.Result = causeResult;
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
       
        [Route("api/v{version:apiVersion}/disciplinary/showcauseresultList/getall/empcode/{empcode}/gradevalue/{gradevalue}/comid/{comid}")]
        public IActionResult  GetAllShowCauseResultList(string empCode, int gradeValue, int comId)
        {
            Response response = new Response("api/disciplinary/showcauseresultList/getall");
            var result = ShowCauseResults.GetAllShowCaseResultList(empCode=null,gradeValue,comId);
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
