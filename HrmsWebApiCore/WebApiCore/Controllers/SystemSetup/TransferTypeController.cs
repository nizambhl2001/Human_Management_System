using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SystemSetup
{
    [Authorize()]
    public class TransferTypeController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/System/Setup/transfer/type/Get")]
        public IActionResult GetTransferType()
        {
            Response response = new Response();
            var result = Transfertype.GetAll();
            try
            {
                if (result.Count > 0)
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
                return Ok(response);
            }
        }
    }
}
