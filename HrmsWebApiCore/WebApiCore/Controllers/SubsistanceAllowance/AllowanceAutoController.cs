using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SubsistanceAllowance;
using WebApiCore.Models.SubsistanceAllowances;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SubsistanceAllowance
{
    [Authorize()]
    [ApiController]
    public class AllowanceAutoController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Subsistanve/Allowance/auto/save")]
        public IActionResult Save(AllowanceAutoModel auto)
        {
            Response response = new Response("/Subsistanve/Allowance/auto/save");
            var result = AllowanceAuto.save(auto);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail to save";
                }
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
  
        }
    }
}