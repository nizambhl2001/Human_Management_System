using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SystemSetup
{
    [Authorize()]
    public class CompanyController : ControllerBase
  {
    [HttpGet]
    [Route("api/v{version:apiVersion}/system/setup/company/get")]
    public IActionResult GetAll()
    {
      Response response = new Response("/system/setup/company/get");
      try
      {
        var result = Company.GetAll();
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
      catch (Exception err)
      {
        response.Status = false;
        response.Result = err.Message;
        return Ok(response);
      }
    }

  }
}
