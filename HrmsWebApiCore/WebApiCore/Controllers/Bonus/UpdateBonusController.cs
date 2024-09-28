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

namespace WebApiCore.Controllers.Bonus
{
    [Authorize()]
    [ApiController]
    public class UpdateBonusController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/festival/bonus/Update/bonus")]
        public IActionResult GetAllBonus()
        {
            Response response = new Response("/festival/bonus/Update/bonus");
            var param = HttpContext.Request.Query;
            FestivalBonusModel bonus = new FestivalBonusModel()
            {
              EmpCode=param["EmpCode"],
              PeriodID=Convert.ToInt32(param["PeriodID"]),
              DepartmentID = Convert.ToInt32(param["DepertMentID"]),
              DesignationID=Convert.ToInt32(param["DesignationID"]),
              SalaryHeadID=Convert.ToInt32(param["SalaryHeadID"]),
              CompanyID=Convert.ToInt32(param["CompanyID"]),
              Grade=Convert.ToInt32(param["Grade"]),
              BonusType=Convert.ToInt32(param["BonusType"])
            };
            var result = UpdateBonus.getAllBonus(bonus);
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/festival/bonus/Update")]
        public IActionResult Update(List<FestivalBonusModel> bonus)
        {
            Response response = new Response("/festival/bonus/Update");
            var result = UpdateBonus.Update(bonus);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Update Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To Update";
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