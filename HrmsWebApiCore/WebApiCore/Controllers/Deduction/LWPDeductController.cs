using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.DbContext.Deduction;
using WebApiCore.Models.Deduction;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Deduction
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class LWPDeductController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/lwpdeduct/getall")]
        public IActionResult GetAll(LWPdeductParater lwpdeduct)
        {
            Response response = new Response("/lwpdeduct/getall");
            try
            {
                var result = LWPdeductDB.GetAllLWPDeduct(lwpdeduct);
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
        [Route("api/v{version:apiVersion}/lwpdeduct/saveupdate")]
        public IActionResult SaveUpdate(AllDeductionModel loanduct)
        {
            Response response = new Response("/lwpdeduct/saveupdate");
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
                        bool result = LWPdeductDB.SaveUpdate(loanduct);
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
                        bool result = LWPdeductDB.SaveUpdate(loanduct);
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