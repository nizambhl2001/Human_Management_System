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
    public class AssetAdditionController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/assetaddition/saveupdate")]
        public IActionResult saveupdate(AssetAdditionModel assetAddition)
        {
            Response response = new Response("/property/assetaddition/saveupdate");
            try
            {
                response.Status = AssetAddition.Saveupdate(assetAddition);
                if (response.Status)
                {
                    if (assetAddition.ID == null)
                    {
                        response.Result = "Saved Succesfully!";
                    }
                    else
                    {
                        response.Result = "Update Succesfully!";
                    }
                }
                else
                {
                    response.Result = "Failed!";
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
        [Route("api/v{version:apiVersion}/property/assetaddition/getall")]
        public IActionResult getall()
        {
            Response response = new Response("/property/assetaddition/getall");
            try
            {
                var result = AssetAddition.getAll();
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
        [Route("api/v{version:apiVersion}/property/assetaddition/getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/property/assetaddition/getbyid/" + id);
            try
            {
                var result = AssetAddition.getById(id);
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
        [HttpDelete]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/property/assetaddition/delete/{id}")]
        public IActionResult Delete(int id)
        {
            Response response = new Response("/property/assetaddition/delete/" + id);
            try
            {
                response.Status = AssetAddition.delete(id);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Result = "Failed to deleted";
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
        [Route("api/v{version:apiVersion}/property/model/get/assetId/{assetId}")]
        public IActionResult GetAssetModel(int assetId)
        {
            Response response = new Response("/property/model/get/assetId/" + assetId);
            try
            {
                var models = AssetAddition.GetAssetModel(assetId);
                if (models.Count > 0)
                {
                    response.Status = true;
                    response.Result = models;
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