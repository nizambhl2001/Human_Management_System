using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Loan;
using WebApiCore.Models.Loan;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Loan
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class StopDeductionController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/loan/stopdeduction/saveupdate/pOtion/{pOptions}")]
        public IActionResult SaveUpdate(StopDeductionSpParametter stopDeduction,int pOptions)
        {
            Response response = new Response("/loan/stopdeduction/saveupdate/pOtion/"+pOptions);
            try
            {
                if (stopDeduction.ID == 0 & pOptions==1)
                {
                    bool result = StopDeductionDb.SaveUpdate(stopDeduction,pOptions);
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
                    
                }
                 else if (stopDeduction.ID > 0 & pOptions ==2)
                {
                    bool result = StopDeductionDb.SaveUpdate(stopDeduction, pOptions);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                       
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                        
                    }
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
        [Route("api/v{version:apiVersion}/loan/stopdeduction/getall/{pOptions}")]
        public IActionResult getAll(StopDeductionSpParametter stpdeduction,int pOptions)
        {
            Response response = new Response("/loan/stopdeduction/getall/"+pOptions);
            var result = StopDeductionDb.GetAll(stpdeduction, pOptions);
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
        [Route("api/v{version:apiVersion}/loan/stopdeduction/getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/loan/stopdeduction/getbyid/" + id);
            try
            {
                var result = StopDeductionDb.getById(id);
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



    }
}