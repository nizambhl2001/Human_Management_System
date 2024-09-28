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
    public class AdditionalTaxInfoController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/additionaltaxinfo/save")]
        public IActionResult saveAdditionalTaxInfo(AdditionalTaxInfoModel additionalTax)
        {
            Response response = new Response("incometax/additionaltaxinfo/save");

            try
            {
                if (additionalTax.ID == 0) {
                    response.Status = AdditionalTaxInfo.saveAdditionalTaxInfo(additionalTax);
                    if (response.Status)
                    {
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Data Not Saved";
                    }
                    return Ok(response);

                }
                else
                {
                    response.Status = AdditionalTaxInfo.UpdateAdditionalTaxInfo(additionalTax);
                    if (response.Status)
                    {
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to Update";
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

        // get tax info list

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/addtionaltaxinfolist/comid/{comid}")]
        public IActionResult GetTaxChallanList(int comid)
        {
            Response response = new Response("/incometax/addtionaltaxinfolist/comid/{comid}");
            try
            {
                var result = AdditionalTaxInfo.getTaxInfoList(comid);
                if (result.Count>0)
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
        [Route("api/v{version:apiVersion}/incometax/addtionaltaxinfobyid/id/{id}")]
        public IActionResult GetTaxChallanByID(int id, int comid)
        {
            Response response = new Response("/incometax/addtionaltaxinfobyid/id/{id}");
            try
            {
                var result = AdditionalTaxInfo.getAdditionalTaxInfobyId(id);
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



        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/incometax/deleteadditionaltaxinfo/id/{id}")]
        public IActionResult DeleteAdditionalTaxinfo(int id)
        {
            Response response = new Response("/incometax/deleteadditionaltaxinfo/id/{id}");
            try
            {
                response.Status = AdditionalTaxInfo.deleteAdditionalTaxInfo(id);
                if (response.Status)
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

    }
}