using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Property;
using WebApiCore.Models.Property;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.Property
{
    [Authorize()]
    [ApiController]
    public class PropertyNameController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/property/name/save")]
        public IActionResult NameSave(PropertyNameModel nameModel)
        {
          Response response=new Response("api/v{version:apiVersion}/property/name/save");
          try
          {
           bool result = PropertyName.Save(nameModel);
           if (result)
           {
             response.Status = true;
             response.Result = "Successfully save";
           }
           else
           {
             response.Status = false;
             response.Result = "Fail to save";
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
        [Route("api/v{version:apiVersion}/property/name/getall")]
        public IActionResult NameGetAll()
        {
          Response response=new Response("api/v{version:apiVersion}/property/name/getall");
          try
          {
            var result = PropertyName.GetAll();
        if (result.Count>0)
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
        [Route("api/v{version:apiVersion}/property/name/getbyid/{id}")]
        public IActionResult NameGetById(int id)
        {
          Response resopnse=new Response("api/v{version:apiVersion}/property/name/getbyid/"+id);
          try
          {
           var result = PropertyName.GetById(id);
           if (result!=null)
           {
             resopnse.Status = true;
             resopnse.Result = result;
           }
           else
           {
             resopnse.Status = false;
             resopnse.Result = "No Data Found";
           }

           return Ok(resopnse);
          }
          catch (Exception err)
          {
            resopnse.Status = false;
            resopnse.Result = err.Message;
            return Ok(resopnse);
          }
          
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/property/name/getbycategoryid/{id}")]
        public IActionResult NameGetByCategoryId(int id)
        {
          Response response=new Response("api/v{version:apiVersion}/property/name/getbycategoryid/"+id);
          try
          {
           var result = PropertyName.GetByCategory(id);
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
        [Route("api/v{version:apiVersion}/property/name/delete/{id}")]
        public IActionResult NameDelete(int id)
        {
          Response response =new Response("api/v{version:apiVersion}/property/name/delete/"+id);
          try
          {
            var result = PropertyName.Delete(id);
            if (result)
            {
              response.Status = true;
              response.Result = "Successfully Delete";
            }
            else
            {
              response.Status = false;
              response.Result = "Fail To Delete";
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
        [Route("api/v{version:apiVersion}/property/name/update")]
        public IActionResult NameUpdate(PropertyNameModel propcat)
        {
          Response response=new Response("api/v{version:apiVersion}/property/name/update");
          try
          {
           bool result = PropertyName.Update(propcat);
           if (result)
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
          catch (Exception err)
          {
            response.Status = false;
            response.Result = err.Message;
            return Ok(response);
          }
        }
    }
}
