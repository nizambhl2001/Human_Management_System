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
    public class TaxAdvanceController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/incometax/taxadvance/save")]
        public IActionResult saveTaxAdvancePaidPayRoll(TaxAdvanceModel taxAdvanceModel )
        {
            Response response = new Response("incometax/taxadvance/save");

            try
            {
                response.Status = TaxAdvance.saveTaxAdvance(taxAdvanceModel);
                if (response.Status)
                {
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Saved";
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