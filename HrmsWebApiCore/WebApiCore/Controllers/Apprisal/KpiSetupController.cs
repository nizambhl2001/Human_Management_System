using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Apprisal;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.Apprisal;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Apprisal
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class KpiSetupController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/get")]
        public IActionResult getBusinessResult()
        {
            var reqParam = HttpContext.Request.Query;
            string empCode = reqParam["empCode"];
            int usertypeId = Convert.ToInt32(reqParam["userTypeID"]);
            int companyId = Convert.ToInt32(reqParam["companyId"]);

            Response response = new Response("/apprisal/kpisetup/get");
            try
            {
                var result = KpiSetupDb.GetBusinessResult(empCode, usertypeId, companyId);
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
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/getbyId/{id}")]
        public IActionResult getKpiById(int id)
        {
            Response response = new Response("/apprisal/kpisetup/getbyId/" + id);

            var result = KpiSetupDb.GetKpiById(id);
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
                    response.Result = "Record not found";
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
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/saveupdate")]
        public IActionResult saveUpdateKpi(KPISetupEntity entitis)
        {
            Response response = new Response("/apprisal/kpisetup/saveupdate");
            response.Status = KpiSetupDb.SaveUpdateKpi(entitis);
            try
            {
                if (entitis.ID == 0)
                {
                    if (response.Status)
                    {
                        response.Result = "Saved Successfully.";
                    }
                    else
                    {
                        response.Result = "Failed to Save!";
                    }
                }
                else
                {
                    if (response.Status)
                    {
                        response.Result = "Update Successfully.";
                    }
                    else
                    {
                        response.Result = "Failed to Update!";
                    }
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/deleteKpi/id/{id}/companyId/{companyId}")]
        public IActionResult deleteKpi(int id, int companyId)
        {
            Response response = new Response("/apprisal/kpisetup/deleteKpi/id/{id}/companyId/{companyId}");
           var result = KpiSetupDb.DeleteKpi(id,companyId);
            try
            {
                if (result)
                {
                    response.Status = true;
                    response.Result = "Delete Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To delete";
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
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/getpeople")]
        public IActionResult getPeopleResult()
        {
            var reqparam = HttpContext.Request.Query;
            string empCode = reqparam["empCode"];
            int usertypeid = Convert.ToInt32(reqparam["userTypeid"]);
            int companyId = Convert.ToInt32(reqparam["companyId"]);
            Response res = new Response("/apprisal/kpisetup/getpeople");

            try
            {
                var result = KpiSetupDb.GetPeopleResult(empCode, usertypeid, companyId);
                if (result != null)
                {
                    res.Status = true;
                    res.Result = result;
                }
                else
                {
                    res.Status = false;
                    res.Result = "No Data Found.";
                }
                return Ok(res);
            }
            catch (Exception err)
            {
                res.Status = false;
                res.Result = err.Message;
                return Ok(res);
            }
        }
        
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/getEmpInfo/companyId/{companyId}/empCode/{empCode}")]
        public IActionResult getEmpInfo(int companyId,string empCode)
        {
            Response response = new Response("/apprisal/kpisetup/getEmpInfo/companyId/" + companyId + "/empCode/" + empCode);
            var result = KpiSetupDb.GetEmployeeInfo(companyId, empCode);
            try
            {
                if (result!=null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Record Not Found.";
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


        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/getYear")]
        public IActionResult getAllYear()
        {
           
            Response res = new Response("/apprisal/kpisetup/getYear");

            try
            {
                var result = KpiSetupDb.GetAllyear();
                if (result != null)
                {
                    res.Status = true;
                    res.Result = result;
                }
                else
                {
                    res.Status = false;
                    res.Result = "No Data Found.";
                }
                return Ok(res);
            }
            catch (Exception err)
            {
                res.Status = false;
                res.Result = err.Message;
                return Ok(res);
            }
        }

        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/kpisetup/getQuarter/empCode/{empCode}/companyId/{companyId}")]
        public IActionResult getQuarter( string empCode, int companyId)
        {
            Response response = new Response("/apprisal/kpisetup/getQuarter/empCode/" + empCode + "/companyId/" + companyId);
            var result = KpiSetupDb.GetQuarter(empCode, companyId);
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
                    response.Result = "Record Not Found.";
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