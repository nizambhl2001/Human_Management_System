using HRMS.DbContext.OverTime;
using Microsoft.AspNetCore.Mvc;
using System;
using HRMS.DbContext.ShiftAllowance;
using HRMS.Models;
using WebApiCore.Models.OverTime;
using WebApiCore.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using WebApiCore.ViewModels.HR;

namespace HRMS.Controllers.OverTime
{
    //[Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class OverTimeController : ControllerBase
    {
        [HttpGet]
        [Route("api/v{version:apiVersion}/ot/requisition/getOtEntitledEmp/bossEmpCode/{bossEmpCode}")]
        public IActionResult GetOtRequisition(string bossEmpCode)
        {
            Response response = new Response($"/ot/requisition/getOtEntitledEmp/bossEmpCode/{bossEmpCode}");
            try
            {
                OverTimeDb otDb = new OverTimeDb();
                List<EmpSearchViewModel> employees = otDb.GetOtEntitledEmployeeByBoss(bossEmpCode);
                response.Status = employees.Count > 0;
                response.Result = employees;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }

        }

        [HttpPost]
        [Route("api/v{version:apiVersion}/ot/requisition/apply")]
        public IActionResult RequisitionApply(OtRequisitionModel requisition)
        {
            Response response = new Response("/ot/requisition/apply");
            try
            {
                response.Status = OverTimeDb.RequisitionApply(requisition);
                response.Result = response.Status ? "Requisition Applied Successfully!" : "Failed to Apply Requisition!";
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
        [Route("api/v{version:apiVersion}/ot/requisition/get/{id}")]
        public IActionResult GetOtRequisition(int id = 0)
        {
            Response response = new Response($"/ot/requisition/get/{id}");
            try
            {
                if (id > 0)
                {
                    OtRequisitionModel otRequisition = OverTimeDb.GetOtRequisitionDetails(id);
                    response.Status = otRequisition != null;
                    response.Result = otRequisition;
                }
                else
                {
                    List<OtRequisitionModel> otRequisition = OverTimeDb.GetOtRequisition();
                    response.Status = otRequisition.Count > 0;
                    response.Result = otRequisition;
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

        [HttpPost]
        [Route("api/v{version:apiVersion}/ot/manual/entry")]
        public IActionResult ManualOtEntry(OtManualEntryModel otManualEntry)
        {
            Response response = new Response();
            try
            {
                response.Status = OverTimeDb.ManualEntry(otManualEntry);
                response.Result = response.Status ? "OT saved successfully!" : "Failed to save manual OT";
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
        [Route("api/v{version:apiVersion}/ot/manual/get/companyId/{companyId}/empCode/{empCode}/otMonth/{otMOnth}")]
        public IActionResult GetManualOt(int companyId, string empCode, string otMonth)
        {
            Response response = new Response();
            try
            {
                List<OtManualEntryModel> manualOt = OverTimeDb.GetManualOt(companyId, empCode, otMonth);
                response.Status = manualOt.Count > 0;
                response.Result = manualOt;
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
        [Route("api/v{version:apiVersion}/ot/process/get")]
        public IActionResult OtCalculate(int companyId, int departmentId, int locationId, string otMonth)
        {
            Response response = new Response("/ot/process/get");
            try
            {
                var processedOt = OverTimeDb.OtCalculate(companyId, departmentId, locationId, otMonth);
                response.Status = processedOt.Count > 0;
                response.Result = processedOt;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpPost]
        [Route("api/v{version:apiVersion}/ot/process/save")]
        public IActionResult SaveProcessOt(List<OtProcessModel> processedOt)
        {
            Response response = new Response("/ot/process/save");
            try
            {
                response.Status = OverTimeDb.SaveOtProcess(processedOt);
                response.Result = response.Status ? "Ot Processed Succesfully!" : "Failed to Process OT";
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
        [Route("api/v{version:apiVersion}/ot/payment/get")]
        public IActionResult OtPayment(int companyId, int departmentId, int locationId, string otMonth)
        {
            Response response = new Response("/ot/payment/get");
            try
            {
                var processedOt = OverTimeDb.OtPayment(companyId, departmentId, locationId, otMonth);
                response.Status = processedOt.Count > 0;
                response.Result = processedOt;
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
        [Route("api/v{version:apiVersion}/ot/replace/get")]
        public IActionResult GetReplacedApprovedOt(int companyId, string empCode, string otDate)
        {
            Response response = new Response("/ot/replace/get");
            try
            {
                var replacedOt = OverTimeDb.GetReplacedApprovedOt(companyId, empCode, otDate);
                response.Status = replacedOt.Count > 0;
                response.Result = replacedOt;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpPost]
        [Route("api/v{version:apiVersion}/ot/replace/apply")]
        public IActionResult ApplyOtReplace(OtReplaceModel otReplace)
        {
            Response response = new Response("/ot/replace/apply");
            try
            {
                response.Status = OverTimeDb.ApplyOtReplace(otReplace);
                response.Result = response.Status ? "Ot Replace applied successfully!" : "Failed to apply OT Replace";
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
