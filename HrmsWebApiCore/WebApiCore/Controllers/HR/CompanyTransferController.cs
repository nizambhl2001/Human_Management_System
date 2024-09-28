using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.DbContext.SalarySetup;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.HR;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class CompanyTransferController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/company/transfer/type/get/empCode/{empCode}/companyId/{companyID}/ptType/{ptType}")]
        public IActionResult GetEmployment(string empCode, int companyID,int ptType)
        {
            Response response =new Response("/hr/company/transfer/type/get/empCode/" + empCode + "/companyId/" + companyID+"/ptType/"+ptType);
            try
            {
                var result = EmpCompanyTransfer.GetCompanytransfer(empCode, companyID,ptType);
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/company/transfer/transfertype/get/companyId/{companyID}")]
        public IActionResult GetTransferType(int companyID)
         {
            Response response = new Response("/hr/company/transfer/transfertype/get/companyId/" + companyID);
            try
            {
                var result = EmpCompanyTransfer.GetAllTransferType(companyID);
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/company/transfer/save/update")]
        public IActionResult SaveUpdate(EmpCompanyTransferModel companyTransfer)
        {
            Response response = new Response("/home/hr/company/transfer/save/update");
            try
            {
                var result = EmpCompanyTransfer.SaveUpdate(companyTransfer);
                if (result)
                    if (companyTransfer.ID == null)
                    {
                        {
                            response.Status = true;
                            response.Result = "SuccessFully Save";
                        }
                    }
                    else
                       {
                        response.Status = true;
                        response.Result = "SuccessFully Update";
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
      
            }
            return Ok(response);
        }


        [HttpGet]
        [Route("api/v{version:apiVersion}/home/hr/company/transfer/edit/{id}")]
        public IActionResult GetAllById(int id)
        {
            Response response = new Response("/home/hr/company/transfer/edit/" + id);
            var result = EmpCompanyTransfer.GetAllbyId(id);
            try
            {
                if (result != null)
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/company/transfer/View/EmpCode/{EmpCode}/TPType/{TPType}/CompanyID/{CompanyID}")]
        public IActionResult view(string empCode,int TPType,int CompanyID)
        {
            Response response = new Response("/home/hr/company/transfer/View/EmpCode/"+empCode+"/TPTyPe/"+TPType+"/CompanyID/"+CompanyID);
        
            try
            {
                var result = EmpCompanyTransfer.View(empCode,TPType,CompanyID);
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/home/hr/company/transfer/getEmploymentsalary/EmpCode/{EmpCode}/CompanyID/{CompanyID}")]
        public IActionResult getEmploymentSalaryDetails(string EmpCode, int CompanyID)
        {
            Response response = new Response("/home/hr/company/transfer/getEmploymentsalary/EmpCode/" + EmpCode + "/CompanyID/" + CompanyID);

            try
            {
                var result = EmpCompanyTransfer.getEmploymentSalaryDetails(EmpCode,CompanyID);
                if (result!=null)
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
    }
}