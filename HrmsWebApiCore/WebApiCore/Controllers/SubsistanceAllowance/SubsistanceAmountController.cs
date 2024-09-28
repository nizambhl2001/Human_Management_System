using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SubsistanceAllowance;
using WebApiCore.Models;
using WebApiCore.Models.SubsistanceAllowances;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers
{
    [Authorize()]
    [ApiController]
    public class SubsistanceAmountController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Subsistanve/Amount/save")]
        public IActionResult Save(SubsistanceAmountModel amount)
        {
            Response response = new Response("/ Subsistanve / Amount / save");
            var result = SubsistanceAmountSetup.Save(amount);
            try
            {
                if (result)
                {
                    if (amount.ID == null)
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Subsistanve/Amount/getAll/{gradeValue}/{compID}")]
        public IActionResult GetAll(int gradeValue,int compID)
        {
            Response response = new Response($"/Subsistanve/Amount/getAll/{gradeValue}/{compID}");
            var result = SubsistanceAmountSetup.GetAll(gradeValue,compID);
            try
            {
                if (result.Count >0)
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Subsistanve/Amount/getById/id/{id}")]
        public IActionResult getById(int id)
        {
            Response response = new Response("/Subsistanve/Amount/getById/id/"+id);
            try
            {
                var result = SubsistanceAmountSetup.getById(id);
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
            }
            return Ok(response);
        }
    }
}