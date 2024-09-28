using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.HR
{
    [Authorize()]
    [ApiController]
    public class EmpProductionPositionController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/HR/emp/production/position/insert")]
        public IActionResult insert(EmpProductionPositionModel production)
        {
            Response response = new Response("/HR/emp/production/position/insert");
            try
            {
                var result = EmpProductionPosition.insert(production);
                if (result)
                {
                    if (production.ID == null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Successfully Updated";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/HR/emp/production/position/by/empCode/{empCode}/companyID/{CompanyID}")]
        public IActionResult getFloreBypPoductionId(string EmpCode, int CompanyID)
        {
            Response response = new Response("/HR/emp/production/position/by/empCode/"+ EmpCode + "/companyID/"+ CompanyID);
            var production = EmpProductionPosition.getByEmpCode(EmpCode,CompanyID);
            try
            {
                if (production.Count > 0)
                {
                    response.Status = true;
                    response.Result = production;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/HR/emp/production/position/by/id/{id}")]
        public IActionResult productionGetById(int id)
        {
            Response response = new Response("/HR/emp/production/position/by/id/" + id);
            var production = EmpProductionPosition.productionGetById(id);
            try
            {
                if (production!=null)
                {
                    response.Status = true;
                    response.Result = production;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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