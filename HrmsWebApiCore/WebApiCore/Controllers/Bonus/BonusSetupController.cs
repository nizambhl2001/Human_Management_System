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
    public class BonusSetupController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/bonus/setup/getAllowance")]
        public IActionResult GetAllowaance()
        {
            Response response = new Response("/bonus/setup/getAllowance");
            var result = BonusSetup.getAllBonusHead();
            try
            {
                if (result.Count>0)
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/bonus/setup/getAll/gradeValue/{gradeValue}/companyId/{companyId}")]
        public IActionResult GetAllBonus(int gradeValue,int companyID)
        {
            Response response = new Response("/bonus/setup/getAll/gradeValue"+gradeValue+"/companyId"+companyID);
            var result = BonusSetup.GetAll(gradeValue,companyID);
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
        [Route("api/v{version:apiVersion}/bonus/setup/Save")]
        public IActionResult Save(BonusSetupModel bonus)
        {
            Response response = new Response("/bonus/setup/Save");
            var result = BonusSetup.Save(bonus);
            try
            {
                if (result)
                {
                    if (bonus.ID == null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
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