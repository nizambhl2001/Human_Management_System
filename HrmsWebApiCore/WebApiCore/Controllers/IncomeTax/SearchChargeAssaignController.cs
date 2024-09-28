using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SearchChargeAssaignController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/searchchargeassaign/saveupdate")]
        public IActionResult searchChargeAssaignSaveUpdate(SearchargeAssainModel assainModel)
        {
            Response response = new Response("incometax/searchchargeassaign/saveupdate");
            try
            {
                if (assainModel.ID == 0)
                {
                    bool result = SearchargeAssain.saveUpdateSearChargeAssign(assainModel);
                    if (result)
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
                    bool result = SearchargeAssain.saveUpdateSearChargeAssign(assainModel);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfylly Update";
                      
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
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/searchchargeassaign/getPersentage/{id}")]
        public IActionResult getPersentage(int id)
        {
            Response response = new Response("incometax/searchchargeassaign/getPersentage");
            var result = SearchargeAssain.serchargePersent(id);
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
                    response.Result = "Data Not Found";
                }return Ok(response);
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }


        // Searcharge Assaign List


        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/searchchargeassaign/list/empcode/{empcode}/comid/{comid}")]
        public IActionResult SearchargeAssaignList(string empcode,int comid)
        {
            Response response = new Response("/incometax/searchchargeassaign/list/empcode/{empcode}/comid/{comid}");
           
            try
            {
                var result = SearchargeAssain.SearchargeAssainList(empcode, comid);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;

                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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


        // GEt By ID


        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/searchchargeassaign/getbyid/{id}")]
        public IActionResult GetSearchargeAssaignByID(int id)
        {
            Response response = new Response("/incometax/searchchargeassaign/getbyid/{id}");
            try
            {
                var result = SearchargeAssain.getById(id);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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