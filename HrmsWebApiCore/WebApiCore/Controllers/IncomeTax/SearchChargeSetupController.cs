using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.IncomeTax;
using WebApiCore.Models.IncomeTax;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SearchChargeSetupController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/searchcharge/getall/{id}")]
        public IActionResult getAllSearchList(int id)
        {
            Response response = new Response("incometax/searchcharge/getall");
            var result = SurchargeSetup.getAllSearchList(id);
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
        [Route("api/v{version:apiVersion}/incometax/searchcharge/getbyid/{id}")]
        public IActionResult getSearchargeByID(int id)
        {
            Response response = new Response("incometax/searchcharge/getbyid");
            try
            {
                var searcharge = SurchargeSetup.getById(id);
                if (searcharge != null)
                {
                    response.Status = true;
                    response.Result = searcharge;
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
        [Authorize()]

        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/searchcharge/saveupdate")]
        public IActionResult SaveUpdateShowCauseResult(SearchChargeSetupModel searchChargeModel)
        {
            Response response = new Response("incometax/searchcharge/saveupdate");
            try
            {
                if (searchChargeModel.ID == 0)
                {
                  response.Status = SurchargeSetup.serchargeSaveUpdate(searchChargeModel);
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
                    response.Status = SurchargeSetup.serchargeSaveUpdate(searchChargeModel);
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

    }
}