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
using WebApiCore.ViewModels.Bonus;

namespace WebApiCore.DbContext.Bonus
{
    [Authorize()]
    [ApiController]
    public class FestivalBonusController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/festival/Bonus/GetAllPeriod")]
        public IActionResult GetAllPeriod()
        {
            Response response = new Response("/festival/Bonus/GetAllPeriod");
            var result = FestivalBonus.GetAllPeriod();
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
            }
            return Ok(response);
        }
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/festival/Bonus/getAllBonus")]
        public IActionResult GetAllBonus()
        {
            var param = HttpContext.Request.Query;
            FestivalBonusModel bonous = new FestivalBonusModel()
            {
                Department = (param["Department"]== "null")?"-1" : (param["Department"].ToString()),
                CompanyID = Convert.ToInt32(param["companyid"]),
                GradeID = Convert.ToInt32(param["GradeID"]),
                BonusType = Convert.ToInt32(param["BonusType"]),
                JobType = (param["JobType"] == "null") ? -1 : Convert.ToInt32(param["JobType"])
            };
            Response response = new Response("/festival/Bonus/getAllBonus");
            var result = FestivalBonus.getAllBonus(bonous);
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
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/festival/bonus/save")]
        public IActionResult Save(FestivalBonusModel bonus)
        {
            Response response = new Response();
            var result = FestivalBonus.Save(bonus);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

    }
}