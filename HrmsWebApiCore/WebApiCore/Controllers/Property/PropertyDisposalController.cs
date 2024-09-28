using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Property;
using WebApiCore.Models.Property;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Property
{
    [Authorize()]
    [ApiController]
    public class PropertyDisposalController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/disposal/saveupdate")]
        public IActionResult SaveUpdate(PropertyDisposalModel prDisposalModel)
        {
            Response response = new Response("api/v{version:apiVersion}/property/disposal/saveupdate");
            try
            {

                bool result = PropertyDisposal.SaveUpdate(prDisposalModel);
                if (prDisposalModel.ID == null)
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";
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
                        response.Result = "Fail To Update";
                    }

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
        [Route("api/v{version:apiVersion}/property/disposal/getAll/by/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetAllByEmpCode(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/property/disposal/getAll/by/empCode/{empCode}/" + empCode + "companyId" + companyId);
            try
            {
                var result = PropertyDisposal.GetAllByEmpCode(empCode, companyId);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found ";
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
        [Route("api/v{version:apiVersion}/property/disposal/getbyid/{id}")]
        public IActionResult GetById(string empCode)
        {
            Response response = new Response("api/v{version:apiVersion}/property/disposal/getbyid/" + empCode);

            try
            {
                var result = PropertyDisposal.GetById(empCode);
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
        [Route("api/v{version:apiVersion}/home/Property/dispose/getById/empCode/{empCode}/compId/{compId}")]
        public IActionResult GetEmpById(string empCode, int compId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/Property/dispose/getById/empCode/" + empCode + "/compId/" + compId);
            try
            {
                var result = PropertyDisposal.GetEmpInfo(empCode, compId);
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