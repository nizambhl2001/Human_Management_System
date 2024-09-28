using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using HRMS.DbContext.SalarySetup;
using HRMS.Models.SalarySetup;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.ViewModels;

namespace HRMS.Controllers.SalarySetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SalaryPeriodController : ControllerBase
    {
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryperiod/getallmonth")]
        public IActionResult GetAllMonth()
        {
            Response response=new Response("/salarysetup/salaryperiod/getallmonth");
            var result = SalaryPeriodDb.GetAllMonth();
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
                    response.Result = "Data not found";
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
        //[HttpGet]
        //[ApiVersion("1")]
        //[Route("api/v{version:apiVersion}/salarysetup/salaryperiod/getsalaryyearbyname/yearname/{yearName}/companyId/{companyID}")]
        //public IActionResult GetEmployment(string yearName, int companyID)
        //{
        //    Response response = new Response("api/v{version:apiVersion}/salarysetup/salaryperiod/getsalaryyearbyname/yearname/" + yearName + "/companyId/" + companyID);
        //    try
        //    {
        //        var result = SalaryPeriodDb.GetSalaryYearByName(yearName, companyID);
        //        if (result != null)
        //        {
        //            response.Status = true;
        //            response.Result = result;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "No data found";
        //        }
        //        return Ok(response);
        //    }
        //    catch (Exception err)
        //    {
        //        response.Status = false;
        //        response.Result = err.Message;
        //        return Ok(response);
        //    }

        //}
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryperiod/getalltaxyear")]
        public IActionResult GetAllTaxYear()
        {
            Response response=new Response("/salarysetup/salaryperiod/getalltaxyear");
            var result = SalaryPeriodDb.GetTaxYears();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryperiod/getAll/{id}")]
        public IActionResult GetAllById(int id)
        {
            Response response = new Response("/salarysetup/salaryperiod/getAll/" + id);
            var result = SalaryPeriodDb.GetAllbyId(id);
            try
            {
                if (result !=null)
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
       
        [HttpPost]
        [Route("api/v{version:apiVersion}/salarysetup/salaryperiod/save")]
        public IActionResult SaveUpdate(SalaryPeriodModel salPeriod)
        {
            Response response=new Response("/salarysetup/salaryperiod/save");
            try
            {
              bool  result = SalaryPeriodDb.SaveSalPeriod(salPeriod);
                if (salPeriod.ID==0)
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved Succesfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail to save";
                    }
                }
                else
                {
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Updated SuccessFully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Fail to Update";
                    }
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/salarysetup/salaryperiod/getAll")]
        public IActionResult GetAll()
        {
            Response response = new Response("/salarysetup/salaryperiod/getAll");
            try
            {
                var result = SalaryPeriodDb.GetAll();
                if (result.Count > 0)
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



    }
}
