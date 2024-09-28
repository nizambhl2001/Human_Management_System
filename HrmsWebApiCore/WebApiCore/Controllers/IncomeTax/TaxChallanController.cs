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

namespace WebApiCore.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class TaxChallanController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/taxchallan/savetaxchallan")]
        public IActionResult saveTaxChallan(TaxChallanModel challanModel)
        {
            Response response = new Response("incometax/taxchallan/savetaxchallan");
            try
            {
                if (challanModel.ID == 0) {

                    response.Status = TaxChallan.saveTaxChallan(challanModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfull";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Faildes To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = TaxChallan.UpdateChallan(challanModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfull";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Faildes To Update";
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
        [Route("api/v{version:apiVersion}/incometax/taxchallanlist/comid/{comid}/taxyearid/{taxyearid}")]
        public IActionResult GetTaxChallanList(int taxyearid, int comid)
        {
            Response response = new Response("/incometax/taxchallanlist/comid/{comid}/taxyearid/{taxyearid}");
           
            try
            {
                if (taxyearid > 0) {
                    var result = TaxChallan.getTaxChallanListByTaxYearID(taxyearid, comid);
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
                else
                {
                    var result = TaxChallan.GetTaxChallanListByComId(comid);
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
        [Route("api/v{version:apiVersion}/incometax/taxchallanbyid/id/{id}/comid/{comid}")]
        public IActionResult GetTaxChallanByID(int id,int comid)
        {
            Response response = new Response("/incometax/taxchallanbyid/id/{id}");
            try
            {
                var result = TaxChallan.getById(id,comid);
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