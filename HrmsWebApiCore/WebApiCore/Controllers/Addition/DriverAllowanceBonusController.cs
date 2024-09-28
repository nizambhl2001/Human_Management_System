using HRMS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRMS.DbContext.Addition;
using HRMS.Models.Addition;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace HRMS.Controllers.Addition
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class DriverAllowanceBonusController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/addition/driverallwbonus/getall/compId/{companyID}/grade/{grade}/usertype/{UserTypeID}")]
        public IActionResult GetAll(int companyID,int grade ,int UserTypeID)
        {
            Response response=new Response("/addition/driverallwbonus/getall/compId/"+companyID+"/grade/"+grade+ "/usertype/"+UserTypeID);
            
            try
            {
                var result = DriverAllwBonusDb.getDriverAllwBonus(companyID, grade,UserTypeID);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data not found";
                }

                return Ok(response);
            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/addition/driverallwbonus/DriverBonusType/getalldriverbonus")]
        public IActionResult GetAllDriverBonus()
        {
            Response response = new Response("/addition/driverallwbonus/DriverBonusType/getalldriverbonus" );

            try
            {
                var result = DriverAllwBonusDb.getAllBonusType();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data not found";
                }

                return Ok(response);
            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/addition/driverallwbonus/saveupdate")]
        public IActionResult SaveUpdate(DriverBonusModel driverallwbonus)
        {
            Response response = new Response("/addition/driverallwbonus/saveupdate");
            try
            {

                if (driverallwbonus.ID == 0)
                {
                    bool result = DriverAllwBonusDb.SaveUpdate(driverallwbonus);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Save";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Save";
                        return Ok(response);
                    }
                }
                else
                {
                    bool result = DriverAllwBonusDb.SaveUpdate(driverallwbonus);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Successfully Update";
                        return Ok(response);
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail To Update";
                        return Ok(response);
                    }
                }
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
