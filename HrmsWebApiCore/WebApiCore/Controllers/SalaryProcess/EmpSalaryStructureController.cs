using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
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
    public class EmpSalaryStructureController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/getalladdition/{structureid}/{comid}")]
        public IActionResult GetSalaryStructureAddition(int structureid,int comid)
        {
            Response response = new Response("/salaryprocess/salarystructure/getalladdition/{structureid}/{comid}");

            try
            {
                var result = EmpSalaryStructure.GetSalaryStructureAddition(structureid,comid);
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
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/getalldeduction/{structureid}/{comid}")]
        public IActionResult GetSalaryStructureDeduction(int structureid,int comid)
        {
            Response response = new Response("/salaryprocess/salarystructure/getalldeduction/{structureid}");

            try
            {
                var result = EmpSalaryStructure.GetSalaryStructureDeduction(structureid,comid);
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
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/paymentchangeaddition/{payAmount}/{empCode}")]
        public IActionResult XLoadSalaryStructureAddition(decimal payAmount,string empCode)
        {
            Response response = new Response("/salaryprocess/empsalarystructure/paymentchangeaddition/{payAmount}/{empCode}");

            try
            {
                var result = EmpSalaryStructure.xpaymentChangeAddition(payAmount, empCode);
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
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/getSalaryStructure/{empCode}")]
        public IActionResult GetSalaryStructure(string empCode)
        {
            Response response = new Response("/salaryprocess/empsalarystructure/getSalaryStructure/{empCode}");

            try
            {
                var result = EmpSalaryStructure.GetSalaryStructure(empCode);
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
        // Based On List
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/basedonlist")]
        public IActionResult GetBasedOnList()
        {
            Response response = new Response("/salaryprocess/empsalarystructure/basedonlist");

            try
            {
                var result = EmpSalaryStructure.BasedOnList();
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
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/paymentchangededuction/{payamount}/{empCode}")]
        public IActionResult XLoadSalaryStructureDeduction(decimal payamount,string empCode)
        {
            Response response = new Response("/salaryprocess/empsalarystructure/paymentchangededuction/{payamount}/{empCode}");

            try
            {
                var result = EmpSalaryStructure.xPaymentChangeDeduction(payamount, empCode);
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
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/saveempsalarystructure")]
        public IActionResult SaveEmpSalaryStructure(EmpSalaryStructureModel empSalaryStructureModel)
        {
            Response response = new Response("/salaryprocess/salarystructure/savesalarystructure");

            try
            {
                response.Status = EmpSalaryStructure.saveEmpSalaryInfo(empSalaryStructureModel);
                if (response.Status)
                {
                    response.Status = true;
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


        [Authorize()]

        // Edit Emp Salary Structure 

        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/empsalarystructure/editempsalarystructure")]
        public IActionResult EditEmpSalaryStructure(EmpSalaryStructureModel empSalaryStructureModel)
        {
            Response response = new Response("/salaryprocess/salarystructure/savesalarystructure");

            try
            {
                response.Status = EmpSalaryStructure.EditEmpSalaryInfo(empSalaryStructureModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Update Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Update";
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/GetEmpSalaryAmount/{empCode}")]
        public IActionResult GetEmpSalaryAmount(string empCode)
        {
            Response response = new Response();

            try
            {
                var result = EmpSalaryStructure.GetEmpSalaryAmount(empCode);
                if (response.Status)
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
        [Route("api/v{version:apiVersion}/salaryprocess/salarystructure/GetOtherAllowance/{empCode}")]
        public IActionResult GetOtherAllowance(string empCode)
        {
            Response response = new Response("salaryprocess/salarystructure/GetOtherAllowance/{empCode}");

            try
            {

                var otherAllowance = EmpSalaryStructure.GetOtherAllowance(empCode);

                return Ok(new { status = true, result = otherAllowance });

                //var result = EmpSalaryStructure.GetOtherAllowance(empCode);
                //if (response.Status)
                //{
                //    response.Status = true;
                //    response.Result = result;
                //}


                //else
                //{
                //    response.Status = false;
                //    response.Result = "Data Not Found";
                //}
                //return Ok(response);
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