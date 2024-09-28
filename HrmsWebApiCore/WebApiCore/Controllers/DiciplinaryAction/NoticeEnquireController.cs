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
    public class NoticeEnquireController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/disciplinary/noticeenquire/saveupdate")]
        public IActionResult SaveUpdate(NoticeEnquireModel noticeEnquire)
        {
            Response response = new Response("api/disciplinary/noticeenquire/saveupdate");
            try
            {
                if (noticeEnquire.ID == 0)
                {
                    response.Status = NoticeOfEnquire.SaveUpdateNoticeEnquire(noticeEnquire);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                       
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";

                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = NoticeOfEnquire.SaveUpdateNoticeEnquire(noticeEnquire);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                        
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                      
                    }
                    return Ok(response);
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
        [Route("api/v{version:apiVersion}/disciplinary/noticeenquire/getall/empcode/{empcode}/gradevalue/{gradevalue}/comid/{comid}")]
        public IActionResult GetEnquireNotice(string empCode, int gradeValue, int comId)
        {
            Response response = new Response("api/disciplinary/noticeenquire/getall");
            var result = NoticeOfEnquire.GetAllNoticeEnquireList(empCode=null,gradeValue,comId);
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

        [HttpGet]
        [Route("api/v{version:apiVersion}/disciplinary/noticeenquire/{id}")]
        public IActionResult GetByNoticeId(int id)
        {
            Response response = new Response("api/disciplinary/noticeenquire/" + id);
            try
            {
                var causeResult = NoticeOfEnquire.getById(id);
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


    }
}
