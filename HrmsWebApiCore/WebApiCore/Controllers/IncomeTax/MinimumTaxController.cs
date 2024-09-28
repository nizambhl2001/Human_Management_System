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
    public class MinimumTaxController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/minimumtax/getall/{id}")]
        public IActionResult getAllSetupList(int id)
        {
            Response response = new Response("incometax/minimumtax/getall");
            var result = MinimumTaxSetup.getAll(id);
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
        [Route("api/v{version:apiVersion}/incometax/minimumtax/getbyid/{id}")]
        public IActionResult getByid(int id)
        {
            Response response = new Response("incometax/minimumtax/getbyid");
            try
            {
                var mintax = MinimumTaxSetup.getById(id);
                if (mintax != null)
                {
                    response.Status = true;
                    response.Result = mintax;
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
        [Route("api/v{version:apiVersion}/incometax/saveminimumtax/save")]
        public IActionResult saveMinimamIncomeTax(TaxMinimumTaxModel taxMinimum)
        {
            Response response = new Response("incometax/saveminimumtax/save");
            try
            {
                response.Status = MinimumTaxSetup.saveMinimumTax(taxMinimum);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Save Succesfully";
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


    }
}