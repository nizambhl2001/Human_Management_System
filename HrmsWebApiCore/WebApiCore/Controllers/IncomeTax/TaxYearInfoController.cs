using HRMS.DbContext.IncomeTax;
using HRMS.Models.IncomeTax;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class TaxYearInfoController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/taxyearinfo/save")]
        public IActionResult SaveTaxYearInfo(TaxYearInfoModel taxYearInfoModel)
        {
            Response response = new Response("api/incometax/taxyearinfo/save");
         
            try
            {
             response.Status= TaxYearInfo.saveTaxYearInfo(taxYearInfoModel);
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
            
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }

        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/taxyearinfo/getall")]
        public IActionResult GetAllYearList()
        {
            Response response = new Response("api/disciplinary/showcauseresult/getall");
            var result = TaxYearInfo.GetAllYear();
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
        [Route("api/v{version:apiVersion}/incometax/taxyearinfo/getbyid/{id}")]
        public IActionResult GetByBankId(int id)
        {
            Response response = new Response("incometax/taxyearinfo/getbyid/" + id);
            try
            {
                var taxYear = TaxYearInfo.getByID(id);
                if (taxYear != null)
                {
                    response.Status = true;
                    response.Result = taxYear;
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
