using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Tour;
using WebApiCore.Models.Tour;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Tour;

namespace WebApiCore.Controllers.Tour
{
    [Authorize()]
    [ApiController]
    public class TourApplyController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/tour/apply/saveUpdate")]
        public IActionResult saveupdate(TourModel tour)
        {
            Response response = new Response("/tour/apply/saveUpdate");
            try
            {
                var result = DbContext.Tour.Tour.SaveUpdate(tour);
                if (result)
                {
                    if (tour.ID == null)
                    {

                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
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
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/tour/getAll")]
        public IActionResult getAll()
        {
            Response response = new Response("/tour/getAll");
            try
            {
                var result = DbContext.Tour.Tour.getAll();
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
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/tour/getById/id/{id}")]
        public IActionResult getById(int id)
        {
            Response response = new Response("/tour/getById/id/");
            try
            {
                var result = DbContext.Tour.Tour.getById(id);
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/tour/get/list/action")]
        public IActionResult getTourList()
        {
            var param = HttpContext.Request.Query;
            TourApproveViewModel status = new TourApproveViewModel()
            {
                ReqTo = param["ReqTo"],
                COmpanyID = Convert.ToInt32(param["COmpanyID"]),
                pOptions= Convert.ToInt32(param["pOptions"]),
            };
            Response response = new Response("/tour/get/list/action");
            var result = DbContext.Tour.Tour.TourListAction(status);
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
                    response.Result = "No data Found";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/tour/status")]
        public IActionResult tourStatus(TourApproveViewModel model)
        {
            Response response = new Response("/tour/status");
            var result = DbContext.Tour.Tour.updateStatus(model);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "SuccessFully";
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
    }
}