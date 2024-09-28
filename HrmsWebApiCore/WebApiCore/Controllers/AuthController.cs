using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApiCore.DbContext.Security;

namespace WebApiCore.DbContext
{
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public IActionResult Authorize(string loginId, string loginPassword)
        //{
        //    if (string.IsNullOrEmpty(loginId) || string.IsNullOrEmpty(loginPassword))
        //        return BadRequest();
            
        //    var user = UserDb.Login(loginId, loginId);
        //    if (user == null)
        //        return BadRequest();

        //    var key = _config["Jwt:Key"];
        //    var issuer = _config["Jwt:Issuer"];
        //    var audience = _config["Jwt:Audience"];
        //    int.TryParse(_config["Jwt:Expires"], out var days);

        //    var expires = DateTime.Now.AddDays(days);

        //    var token = new Token(key, issuer, audience, expires);
        //    var tokenString = token.BuildToken();
        //    return Ok(new { token = tokenString, user });
        //}
    }
}