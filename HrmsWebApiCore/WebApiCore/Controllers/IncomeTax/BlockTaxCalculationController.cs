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
    public class BlockTaxCalculationController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/blocktaxcalculation/process")]
        public IActionResult TaxBlockCalculation(TaxCalculationModel blockTaxModel)
        {
            Response response = new Response("/incometax/blocktaxcalculation/process");
            try
            {
                response.Status = BlockTaxCalculation.ProcessEmpIncomeLWPBlock(blockTaxModel);
                if (response.Status)
                {
                    bool emIncomeTaxBlockStatus = BlockTaxCalculation.ProcessEmpIncomeTaxBlock(blockTaxModel);
                    if (emIncomeTaxBlockStatus)
                    {
                        bool empAdditionBlockStatus = BlockTaxCalculation.ProcessEmpIncomeAdditionaBlock(blockTaxModel);
                        if (empAdditionBlockStatus)
                        {
                            response.Status = true;
                            response.Result = "Tax Process Done";
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Tax Process Failed";
                        }
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Tax Process Failed";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Tax Process Failed";
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