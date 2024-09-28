using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.IncentiveOther;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.InsentiveOther
{
    [Authorize()]
    [ApiController]
    public class SubtitutionLeaveAmountController : ControllerBase
    {

   
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/insentive/other/subtitution/leave/amount/getAll")]
        public IActionResult getAll()
        {
            var param = HttpContext.Request.Query;
            SubtitutionLeaveAmountViewModel get = new SubtitutionLeaveAmountViewModel()
            {
                BranchID = Convert.ToInt32(param["BranchID"]),
                DepartmentID = Convert.ToInt32(param["DepartmentID"]),
                YearID = Convert.ToInt32(param["YearID"]),
                SalaryPeriodID=Convert.ToInt32(param["PeriodID"]),
                GradeValue = Convert.ToInt32(param["GradeValue"]),
                CompanyID = Convert.ToInt32(param["CompanyID"])
            };
            Response response = new Response("/insentive/other/subtitution/leave/amount/getAll");
            var result = SubstituteLeaveAmount.ShowData(get);
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
    }
}