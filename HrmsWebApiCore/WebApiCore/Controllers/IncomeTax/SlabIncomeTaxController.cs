using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Models.SalarySetup;
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
    public class SlabIncomeTaxController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/slabincometax/getallslab")]
        public IActionResult getAllSlabType()
        {
            Response response = new Response("incometax/slabincometax/getallslab");
            var result = SlabIncomeTax.allSlabType();
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/slabincometax/save")]
        public IActionResult saveSlabIncomeTax(SlabIncomeTaxModel taxModel)
        {
            Response response = new Response("/incometax/slabincometax/save");
            try
            {
                if (taxModel.ID == 0) {
                    response.Status = SlabIncomeTax.saveSlabIncomeTax(taxModel);
                    if (response.Status)
                    {
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
                    response.Status = SlabIncomeTax.updateSlabIncomeTax(taxModel);
                    if (response.Status)
                    {
                        response.Result = "Update Succesfully";
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
        [Route("api/v{version:apiVersion}/incometax/slabincometax/slabincomeBytaxyearid/{id}/slabTypeID/{slabTypeID}")]
        public IActionResult getAllSlabIncome(int id, int slabTypeID)
        {
            Response response = new Response("incometax/slabincometax/getallslabincome");
            var result = SlabIncomeTax.getAllSlabIncomeTaxByTaxYearId(id, slabTypeID);
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
        [Route("api/v{version:apiVersion}/incometax/slabincometax/getbyid/{id}")]
        public IActionResult getByid(int id)
        {
            Response response = new Response("incometax/slabincometax/getbyid");
            try
            {
                var slabIncome = SlabIncomeTax.getById(id);
                    if (slabIncome != null)
                {
                    response.Status = true;
                    response.Result = slabIncome;
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/incometax/slabincometax/getallslabincomeById/{id}/taxYearID/{taxYearID}")]
        public IActionResult getAllSlabIncomeBySlabId(int id, int taxYearID)
        {
            Response response = new Response("incometax/slabincometax/getallslabincome");
            var result = SlabIncomeTax.getAllSlabIncomeBySlabType(id, taxYearID);
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

    }
}