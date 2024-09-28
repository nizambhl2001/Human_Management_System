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
    public class PropertyCategoryController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/category/save")]
        public IActionResult Catagorysave(PropertyCatagoryModel catagoryModel)
        {
            Response response = new Response("/property/category/save");
            try
            {
                bool result = PropertyCatagory.Save(catagoryModel);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Saved Successfully!";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to saved!";
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
        [Route("api/v{version:apiVersion}/property/category/getall")]
        public IActionResult Categorygetall()
        {
            Response response = new Response("api/v{version:apiVersion}/property/category/getall");
            try
            {
                var result = PropertyCatagory.GetAll();
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
        [Route("api/v{version:apiVersion}/property/category/getbyid/{id}")]
        public IActionResult CategoryGetById(int id)
        {
            Response response = new Response("api/v{version:apiVersion}/property/category/getbyid/" + id);
            try
            {
                var result = PropertyCatagory.GetById(id);
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
        [Route("api/v{version:apiVersion}/property/category/delete/{id}")]
        public IActionResult CategoryDelete(int id)
        {
            Response response = new Response("api/v{version:apiVersion}/property/category/delete/" + id);
            try
            {
                var result = PropertyCatagory.Delete(id);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Delete Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Delete";
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
        [HttpPut]
        [Route("api/v{version:apiVersion}/property/category/update")]
        public IActionResult CategoryUpdate(PropertyCatagoryModel propcat)
        {
            Response response = new Response("/property/category/update");
            try
            {
                var result = PropertyCatagory.Update(propcat);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Update Successfully!";
                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to Update!";
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
    }
}