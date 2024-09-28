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
using WebApiCore.ViewModels.IncomeTax;

namespace WebApiCore.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ChallanPrepareController : ControllerBase
    {

        [Authorize()]
        [HttpPut]
        [Route("api/v{version:apiVersion}/incometax/challanprepare/updatechallanumber")]
        public IActionResult UpdateChallanPrepare(ChallanPrepairModel challanPrepairModel)
        {
            Response response = new Response("incometax/challanprepare/updatechallanumber");
           
            try
            {
                response.Status = ChallanNumberAssaign.updateChallanNumber(challanPrepairModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Update Succesfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Update";
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
        [Route("api/v{version:apiVersion}/incometax/challanprepare/showall/{paymenttype}/{periodId}/{bonustype}/{gradeValue}/{branch}/{companyid}")]
        public IActionResult ShoAll(int paymenttype, int periodId,int bonystype,  int? gradeValue, int? branch, int companyid)
        {
            Response response = new Response("/incometax/challanprepare/showall");
            
            try
            {
                if (paymenttype > 1) {
                   
                    var result = ChallanNumberAssaign.GetTaxChallanBonusShowList(periodId, gradeValue, bonystype, branch, companyid);
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
                    var result = ChallanNumberAssaign.showAll(periodId, gradeValue, branch, companyid);
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/challanprepare/savechallanprepare")]
        public IActionResult SaveChallanPrepare(ChallanPrepairModel challanPrepairModel)
        {
            Response response = new Response("incometax/challanprepare/savechallanprepare");

            try
            {
                response.Status = ChallanNumberAssaign.saveChallanPrepare(challanPrepairModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Save Succesfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Save";
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