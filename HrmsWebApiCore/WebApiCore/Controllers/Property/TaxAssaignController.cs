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
    public class TaxAssaignController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/TaxAssain/saveUpdate")]
        public IActionResult SaveUpdate(TaxAssainModel TaxAssain)
        {
            Response response = new Response("/property/TaxAssain/saveUpdate");
            try
            {

                var result = DbContext.Property.TaxAssain.Saveupdate(TaxAssain);
                if (TaxAssain.ID == null)
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
        [Route("api/v{version:apiVersion}/property/TaxAssain/getall")]
        public IActionResult Categorygetall()
        {
            Response response = new Response("api/v{version:apiVersion}/property/TaxAssain/getall");
            try
            {
                var result = TaxAssain.getAll();
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/TaxAssain/get/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult CategoryGetById(string empCode, int companyID)
        {
            Response response = new Response("api/v{version:apiVersion}/property/TaxAssain/get/empCode/" + empCode + "/companyId/" + companyID);
            try
            {
                var result = TaxAssain.GetById(empCode, companyID);
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
        [HttpDelete]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/TaxAssain/delete/{id}")]
        public IActionResult Delete(int id)
        {
            Response response = new Response("api/v{version:apiVersion}/property/TaxAssain/delete/" + id);
            try
            {
                var result = TaxAssain.delete(id);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Successfully Delete";
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