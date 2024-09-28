using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SystemSetup
{
    [Authorize()]
    [ApiController]
    public class EmpTypeController : ControllerBase
    {
      [HttpGet]
      [ApiVersion("1")]
      [Route("api/v{version:apiVersion}/system/setup/emptype/getall")]
      public IActionResult GetEmpType()
      {
      Response response = new Response("/system/setup/emptype/getall");
      try
      {
        var result = EmpType.GetAll();
        if (result.Count > 0)
        {
          response.Status = true;
          response.Result = result;
        }
        else
        {
          response.Status = false;
          response.Result = "No data found";
        }
        return Ok(response);
      }
      catch(Exception err)
      {
        response.Status = false;
        response.Result = err.Message;
        return Ok(response);
      }
      }
    }
}
