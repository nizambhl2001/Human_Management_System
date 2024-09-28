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
    public class SalaryStructureController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/getalltype")]
        public IActionResult GetStructureList()
        {
            Response response = new Response("/salaryprocess/salarystructure/getalltype");

            try
            {
                var result = SalaryStructure.getSalaryTypeList();
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/getalladdition/{structureid}")]
        public IActionResult GetSalaryStructureAddition(int structureid)
        {
            Response response = new Response("/salaryprocess/salarystructure/getalladdition/{structureid}");

            try
            {
                var result = SalaryStructure.GetSalaryStructureAddition(structureid);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/getalldeduction/{structureid}")]
        public IActionResult GetSalaryStructureDeduction(int structureid)
        {
            Response response = new Response("/salaryprocess/salarystructure/getalldeduction/{structureid}");

            try
            {
                var result = SalaryStructure.GetSalaryStructureDeduction(structureid);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Not Found";
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

        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/savesalarystructure")]
        public IActionResult GetSalaryStructureDeduction(SalaryStructureModel structureModel)
        {
            Response response = new Response("/salaryprocess/salarystructure/savesalarystructure");
            
            try
            {
                response.Status = SalaryStructure.saveSalaryStructure(structureModel);
                if (response.Status)
                {
                    response.Result = "Data Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Save";
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