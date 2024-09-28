using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.DbContext.Deduction;
using WebApiCore.Models;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Deduction;

namespace WebApiCore.Controllers.Deduction
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class LoanDeductController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/loandeduct/getloan/{companyID}")]
        public IActionResult GetLoan(int companyID)
        {
            Response response = new Response("/loandeduct/getloan/" + companyID);
            try
            {
                var result = LoanDeductDB.getloan(companyID);
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
        [Route("api/v{version:apiVersion}/loandeduct/getall")]
        public IActionResult GetAll(AdditionNDDeductionGetAllParam loandeduct)
        {
            Response response = new Response("/loandeduct/getall");
            try
            {
                var result = LoanDeductDB.GetAllLoanDeduct(loandeduct);
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
        [Route("api/v{version:apiVersion}/loandeduct/saveupdate")]
        public IActionResult SaveUpdate(AllDeductionModel loanduct)
        {
            WebApiCore.ViewModels.Response response = new Response("/loandeduct/saveupdate");
            try
            {
                var result1 = AdditionAllowanceDb.checkSalaryPeriod(loanduct);
                if (result1.Count > 0)
                {
                    response.Status = true;
                    response.Result = "This month salary already Locked";
                    return Ok(response);

                }
                else
                {
                    if (loanduct.ID == 0)
                    {
                        bool result = LoanDeductDB.SaveUpdate(loanduct);
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
                        bool result = LoanDeductDB.SaveUpdate(loanduct);
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