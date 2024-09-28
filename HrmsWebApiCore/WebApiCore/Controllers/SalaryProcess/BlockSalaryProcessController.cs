using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class BlockSalaryProcessController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/blocksalaryprocess/getblockemployee")]
        public IActionResult GetBlockEmployee(BlockSalaryProcessModel parammodel)
        {
            Response response = new Response("/salaryprocess/blocksalaryprocess/getblockemployee");
            var result = BlockSalaryProcess.GetBlockEmployee(parammodel);
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
                    response.Result = "Data Not Found";
                }return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/blocksalaryprocess/processempsalaryblock")]
        public IActionResult ProcessEmpSalaryBlock(BlockSalaryProcessModel parammodel)
        {
            Response response = new Response("/salaryprocess/blocksalaryprocess/processempsalaryblock");
            
            try
            {
                response.Status = BlockSalaryProcess.ProcessEmpSalaryBlock(parammodel);
                if (response.Status)
                {
                  
                    response.Result = "Salary Process Successfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failded to process";
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