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
    public class IncomeTaxSetupController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/incometaxsetup/getall/{id}")]
        public IActionResult getAllSetupList(int id)
        {
            Response response = new Response("incometax/incometaxsetup/getall");
            var result = IncomeTaxSetup.getAll(id);
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

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/incometaxsetup/save")]
        public IActionResult saveSlabIncomeTax(IncomeTaxSetupModel setupModel)
        {
            Response response = new Response("/incometax/incometaxsetup/save");
            try
            {
                if (setupModel.ID == 0) {
                    response.Status = IncomeTaxSetup.saveTaxSetup(setupModel);
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
                else
                {
                    response.Status = IncomeTaxSetup.updateTaxSetup(setupModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfull";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
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
        [Route("api/v{version:apiVersion}/incometax/incometaxsetup/getbyid/{id}")]
        public IActionResult getByid(int id)
        {
            Response response = new Response("incometax/incometaxsetup/getbyid");
            try
            {
                var incomeSetup = IncomeTaxSetup.getById(id);
                if (incomeSetup != null)
                {
                    response.Status = true;
                    response.Result = incomeSetup;
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