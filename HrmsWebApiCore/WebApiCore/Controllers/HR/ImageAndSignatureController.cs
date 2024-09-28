using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class ImageAndSignatureController : ControllerBase
    {
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/image/signature/get/by/empCode/{empCode}")]
        public IActionResult getByEmpCode(string empCode)
        {
            Response response = new Response("/hr/image/signature/get/by/empCode/" + empCode);
            try
            {
                var result = ImageandSignature.getByEmpCode(empCode);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No Data Found";
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