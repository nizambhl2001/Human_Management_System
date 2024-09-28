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
    public class PropertyAssaignController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/assain/saveupdate")]
        public IActionResult PropertyAssignsave(PropertyAssignModel propertyAssign)
        {
            Response response = new Response("/property/assain/saveupdate");
            try
            {

                bool result = PropertyAssign.SaveUpdate(propertyAssign);
                if (propertyAssign.ID == null)
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
        [Route("api/v{version:apiVersion}/property/assain/getall")]
        public IActionResult getall()
        {
            Response response = new Response("/property/assain/getall");
            try
            {
                var result = PropertyAssign.getAll();
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/emp/info/getAssignById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/emp/info/getAssignById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = PropertyAssign.GetAssignById(empCode, companyId);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found!";
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/assain/delete/{id}")]
        public IActionResult Delete(int id)
        {
            Response response = new Response("/property/assain/delete/" + id);
            try
            {
                var result = PropertyAssign.Delete(id);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Status = false;
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/property/getById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetEmpById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/property/getById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = PropertyAssign.GetEmpById(empCode, companyId);
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/property/getFromById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetFromEmpById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/property/getFromById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = PropertyAssign.GetFromEmpById(empCode, companyId);
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/property/getFromById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult GetAssainById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/property/getAssainById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = PropertyAssign.GetAssignById(empCode, companyId);
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/property/get/AssaignAsset/ById/")]
        public IActionResult GetAssaigAssetnById(int id)
        {
            Response response = new Response("/home/property/get/AssaignAsset/ById/" + id);
            try
            {
                var result = PropertyAssign.GetAssainAssetById(id);
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
        //Author Ashiq

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/assigned/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetAssignedAsset(string empCode, int compId)
        {
            Response response = new Response("/property/assignedAsset/compId/" + compId + "/empCode/" + empCode);
            try
            {
                var assets = PropertyAssign.GetAssignedAsset(empCode, compId);
                if (assets.Count > 0)
                {
                    response.Status = true;
                    response.Result = assets;
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