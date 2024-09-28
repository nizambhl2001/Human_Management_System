using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class SalaryDeductionController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salarydeduct/getall")]
        public IActionResult GetAll(AdditionNDDeductionGetAllParam saldeduct)
        {
            Response response = new Response("/salarydeduct/getall");
            try
            {
                var result = SalaryDeductDB.GetAllSalaryDeduct(saldeduct);
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
        [Route("api/v{version:apiVersion}/salarydeduct/saveupdate")]
        public IActionResult SaveUpdate(AllDeductionModel salaryduct)
        {
            Response response = new Response("/salarydeduct/saveupdate");
            try
            {
                var result1 = AdditionAllowanceDb.checkSalaryPeriod(salaryduct);
                if (result1.Count > 0)
                {
                    response.Status = true;
                    response.Result = "This month salary already Locked";
                    return Ok(response);

                }

                if (salaryduct.ID == 0 )
                {
                    bool result = SalaryDeductDB.SaveUpdate(salaryduct);
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
                    bool result = SalaryDeductDB.SaveUpdate(salaryduct);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }

        }
    }
}