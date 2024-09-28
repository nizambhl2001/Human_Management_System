using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
 

namespace WebApiCore.DbContext
{
    [ApiVersion("1")]
    //[ApiVersion("2")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class ExampleController : ControllerBase
    {
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public IActionResult ExampleMethodV1()
        {
            return Ok("Example response v1");
        }

        [EnableCors("AllowOrigin")]
        [HttpGet, Authorize, MapToApiVersion("2")]
        public IActionResult ExampleMethodV2()
        {
            return Ok("Example response v2");
        }
    }
}