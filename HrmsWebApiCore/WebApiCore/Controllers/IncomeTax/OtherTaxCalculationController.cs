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

namespace WebApiCore.Controllers.IncomeTax
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class OtherTaxCalculationController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/othertaxcalculation/process")]
        public IActionResult OtherTaxCalculationProcess(TaxCalculationModel calculationModel)
        {
            Response response = new Response("/incometax/othertaxcalculation/process");
            try
            {
                bool employeeListStatus = OtherTaxCalculation.GetEmployeeInfoListByFilter(calculationModel);
                if (employeeListStatus)
                {
                    bool empBonusTaxStatus = OtherTaxCalculation.ProcessEmpBonusTAx(calculationModel);
                    if (empBonusTaxStatus)
                    {
                        response.Status = true;
                        response.Result = "Tax Process Done";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Process Emp Bonus Tax";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Employee not found for process";
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