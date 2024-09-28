using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class EmpBlockInfoController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/emp/block/info/save")]
        public IActionResult Save(EmpBlockInfoModel empBlock)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/emp/block/info/save");
            try
            {
                var result = EmpBlockInfo.EmpBlockInfoSave(empBlock);
                if (result)
                    if (empBlock.ID == null)
                    {
                        
                            response.Status = true;
                            response.Result = "Save Successfully";
                        
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Successfully Updated";
                    }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
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
        [Route("api/v{version:apiVersion}/home/hr/emp/block/info/getById/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult getById(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/emp/block/info/getById/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = EmpBlockInfo.GetById(empCode, companyId);
                if (result != null)
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
                return Ok(response);
            }
        }


        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/emp/block/info/EmpBlock_ni/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult EmpBlock_ni(string empCode, int companyId)
        {
            Response response = new Response("api/v{version:apiVersion}/home/hr/emp/block/info/EmpBlock_ni/empCode/" + empCode + "/companyId/" + companyId);
            try
            {
                var result = EmpBlockInfo.EmpBlock_ById(empCode, companyId);
                if (result != null)
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
                return Ok(response);
            }
        }


    }
}