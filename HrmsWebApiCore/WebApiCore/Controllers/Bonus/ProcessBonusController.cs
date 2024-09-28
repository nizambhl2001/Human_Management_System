using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Models.Bonus;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.Bonus
{
    [Authorize()]
    [ApiController]
    public class ProcessBonusController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/bonus/Process/Bonus/get")]
        public IActionResult GetImportBonus()
        {
            var param = HttpContext.Request.Query;
            processImportView bonus = new processImportView()
            {
                companyid= Convert.ToInt32(param["CompanyID"]),
                PeriodID=Convert.ToInt32(param["PeriodID"]),
                SalaryHeadID = Convert.ToInt32(param["SalaryHeadID"]),
                Bonustype = Convert.ToInt32(param["BonusType"]),

            };
            Response response = new Response("/bonus/Process/Bonus/get");
            var result = ProcessImportBonus.GetImportBonus(bonus);
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
            }
            return Ok(response);
        }
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/Process/import/bonus/save")]
        public IActionResult Save(FestivalBonusModel bonus)
        {
            Response response = new Response();
            var result = ProcessImportBonus.Save(bonus);
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