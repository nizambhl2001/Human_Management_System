using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Bonus;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.Bonus
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class BonustypeController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Bonus/Type/Get")]
        public IActionResult GetBonusType()
        {
            Response response = new Response("/Bonus/Type/Get");
            var result = BonusType.getBonus();
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
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Bonus/Type/Save")]
        public IActionResult Save(BonusTypeModel type)
        {
             
            Response response = new Response("/Bonus/Type/Save");
            var result = BonusType.SaveBonusType(type);
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
                    response.Result = "Fail To Save";
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