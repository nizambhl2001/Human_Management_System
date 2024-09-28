using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.Models;
using WebApiCore.Models.Addition;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.Controllers.Addition
{

    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class AdditionAllowanceController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/addition/additionallowance/getall")]
        public IActionResult GetAll(AdditionNDDeductionGetAllParam additionAllowance)
        {
            Response response = new Response("/addition/additionallowance/getall");
            

            try
            {
                var result = AdditionAllowanceDb.GetAllAdditionAllowance(additionAllowance);

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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/addition/additionallowance/saveupdate")]
        public IActionResult SaveUpdate(AllDeductionModel additionAllowance )
        {
            Response response = new Response("/addition/additionallowance/saveupdate");
            try
            {
                var result1 = AdditionAllowanceDb.checkSalaryPeriod(additionAllowance);
                if (result1.Count > 0)
                {
                  response.Status = true;
                  response.Result = "This month salary already Locked";
                  return Ok(response);
                   
                }
                else 
                {
                    if (additionAllowance.ID == 0)
                    {
                        bool result = AdditionAllowanceDb.SaveUpdate(additionAllowance);
                        if (result)
                        {
                            response.Status = true;
                            response.Result = "Successfully Saved";
                            return Ok(response);
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Fail To Saved";
                            return Ok(response);
                        }
                    }
                    else
                    {
                        bool result = AdditionAllowanceDb.SaveUpdate(additionAllowance);
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
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/addition/additionallowance/getallsalaryheadtype")]
        public IActionResult getAllSalaryHeadType()
        {
            Response response = new Response("/addition/additionallowance/getallsalaryheadtype");

            try
            {
                var restult = AdditionAllowanceDb.GetAllbysalryHeadtype();
                if (restult.Count >0)
                {
                    response.Status = true;
                    response.Result = restult;
                }
                else
                {
                    response.Status = false;
                    response.Result = "no data found";
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
    }
}