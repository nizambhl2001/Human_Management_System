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
    public class PunishmentController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/disciplinary/punishment/saveupdate")]
        public IActionResult SaveUpdate(PunishmentModel punishment)
        {
            Response response = new Response("api/disciplinary/punishment/saveupdate");
            try
            {
                if (punishment.ID == 0)
                {
                    response.Status = Punishment.saveUpdatePunishment(punishment);
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
                    response.Status = Punishment.saveUpdatePunishment(punishment);
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
        [Route("api/v{version:apiVersion}/disciplinary/punishment/getall/empcode/{empcode}/gradevalue/{gradevalue}/comid/{comid}")]
        public IActionResult GetEnquireNotice(string empCode, int gradeValue, int comId)
        {
            Response response = new Response("api/disciplinary/punishment/getall");
            var result = Punishment.getAllPunishmentList(empCode = null, gradeValue, comId);
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
        [Route("api/v{version:apiVersion}/disciplinary/punishment/getbyid/{id}")]
        public IActionResult getByid(int id)
        {
            Response response = new Response("api/disciplinary/punishment/" + id);
            try
            {
                var punishment = Punishment.getByid(id);
                if (punishment != null)
                {
                    response.Status = true;
                    response.Result = punishment;
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
