using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.DbContext.Deduction;
using WebApiCore.Models;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Deduction
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class OtherDeductController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/otherdeduct/getall")]
        public IActionResult GetAll(AdditionNDDeductionGetAllParam otherdeduct)
        {
            Response response = new Response("/otherdeduct/getall");
            try
            {
                var result = OtherDeductionDb.GetAllSalaryDeduct(otherdeduct);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;

                }
                else
                {
                    response.Status = false;
                    response.Result = "Data not found";
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
        [Route("api/v{version:apiVersion}/otherdeduct/saveupdate")]
        public IActionResult SaveUpdate(AllDeductionModel otherdeduct)
        {
            Response response = new Response("/otherdeduct/saveupdate");
            try
            {
                var result1 = AdditionAllowanceDb.checkSalaryPeriod(otherdeduct);
                if (result1.Count > 0)
                {
                    response.Status = true;
                    response.Result = "This month salary already Locked";
                    return Ok(response);

                }
                else
                {
                    if (otherdeduct.ID == 0)
                    {
                        bool result = OtherDeductionDb.SaveUpdate(otherdeduct);
                        if (result)
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
                        bool result = OtherDeductionDb.SaveUpdate(otherdeduct);
                        if (result)
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