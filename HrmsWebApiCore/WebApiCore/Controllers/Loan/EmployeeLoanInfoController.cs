using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Loan;
using WebApiCore.Models.Loan;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Loan
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class EmployeeLoanInfoController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/loan/employeeloanInfo/getemploanbyid/{id}")]
        public IActionResult GetEmpLoanById(int id)
        {
            Response response = new Response("/loan/employeeloanInfo/getemploanbyid/" + id );
            try
            {
                var result = EmployeeLoanInfoDb.GetEmployeeLoanbyID(id);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
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
        
        [Route("api/v{version:apiVersion}/loan/emploaninfo/get/empCode/{empCode}")]
        public IActionResult GetEmployeeLoanInfo(string empCode)
        {
            Response response = new Response("/loan/emploaninfo/get/empCode/" + empCode );
            try
            {
                var result = EmployeeLoanInfoDb.GetEmployeeLoanInfo(empCode);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/loan/emploaninfo/Save")]
        public IActionResult Save(EmployeeLoanInfo emploaninfo)
        {
            Response response = new Response("/loan/emploaninfo/Save");
            try
            {
                response.Status = EmployeeLoanInfoDb.Save(emploaninfo);
                if (response.Status)
                {

                    response.Result = "saved Succesfully";
                }
                else
                {

                    response.Result = "data not found";
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
        [HttpPut]
        [Route("api/v{version:apiVersion}/loan/emploaninfo/update")]
        public IActionResult Update(EmployeeLoanInfo emploaninfo)
        {
            Response response = new Response("/loan/emploaninfo/update");
            try
            {
                response.Status = EmployeeLoanInfoDb.update(emploaninfo);
                if (response.Status)
                {
                    response.Result = "Updated successfully!";
                }
                else
                {
                    response.Result = "Failed to update";
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