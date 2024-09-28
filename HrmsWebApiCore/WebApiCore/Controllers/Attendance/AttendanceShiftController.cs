using HRMS.Models;
using HRMS.Models.Attendance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.DbContext.Attendance;
using WebApiCore.Models.Attendance;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Attendance;

namespace WebApiCore.Controllers.Attendance
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public partial class AttendenceApplicationController
    {
        [Authorize()]
        //Shift Setup
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendance/shiftsetup/getall")]
        public IActionResult GetAllShift()
        {
            Response response = new Response("/attendance/shiftsetup/getall");
            try
            {
                var result = AttendenceApplication.GetAllShift();
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
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendance/shiftSetup/saveOrUpdate")]
        public IActionResult SaveOrUpdate(ShiftSetupModel model)
        {
            Response response = new Response("/attendance/shiftSetup/saveOrUpdate");
            try
            {
                response.Status = AttendenceApplication.SaveOrUpdateShift(model);
                response.Result = response.Status ? (model.Id > 0 ? "Shift Updated Successfully!" : "Shift Saved Successfully")
                    : ((model.Id > 0) ? "Failed to Update Shift" : "Failed to Save Shift");
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
        //Shift Assign
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/getEmployees")]
        public IActionResult GetEmployees()
        {
            Response response = new Response("/attendance/shiftAssign/getEmployees");
            try
            {
                var reqParam = HttpContext.Request.Query;
                FilterModel filterModel = new FilterModel
                {
                    Department = reqParam["department"],
                    Designation = reqParam["designation"],
                    WorkStation = reqParam["workStation"],
                    Location = reqParam["location"],
                    CompanyID = Convert.ToInt16(reqParam["companyID"]),
                    GradeValue = Convert.ToInt16(reqParam["gradeValue"])
                };
                var employees = AttendenceApplication.GetEmployees(filterModel);
                response.Status = employees.Count > 0;
                response.Result = (employees.Count > 0) ? employees : (object)"No data found";
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
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/getShiftDayInfo")]
        public IActionResult GetDayOfShiftInfo(string startDate, string endDate, string shiftName,string weekday)
        {
            Response response = new Response("/attendance/shiftAssign/getShiftDayInfo");
            try
            {
                var days = AttendenceApplication.GetDayOfShiftInfo(startDate, endDate, shiftName, weekday);
                response.Status = days.Count > 0;
                response.Result = (days.Count > 0) ? days : (object)"No data found";
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Obsolete]
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/insert")]
        public IActionResult InsertShiftManagementInfo(List<ShiftManagementModel> shiftInfoList)
        {
            Response response = new Response("/attendance/shiftAssign/insert");
            try
            {
                response.Status = AttendenceApplication.InsertShiftManagementInfo(shiftInfoList);
                response.Result = (response.Status) ? "Shift Assigned Successfully" : "Failed to Assign Shift";
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
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/edit")]
        public IActionResult GetAssignedShift(AssignedShiftFilterModel filterModel)
        {
            Response response = new Response("/attendance/shiftAssign/edit");
            try
            {
                var result = AttendenceApplication.GetAssignedShift(filterModel);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = result;
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendance/assignShift")]
        public IActionResult AssignShift(List<ShiftManagementModel> shiftInfoList)
        {
            Response response = new Response("/attendance/shiftAssign/update");
            try
            {
                response.Status = AttendenceApplication.AssignShift(shiftInfoList);
                response.Result = (response.Status) ? "Shift Assigned Successfully" : "Failed to Assign Shift";
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
        [Route("api/v{version:apiVersion}/attendance/get/empCodes/by/EmpCode/{EmpCode}/CompanyID/{CompanyID}")]
        public IActionResult getEmpCodes(string EmpCode,int CompanyID)
        {
            Response response = new Response("/attendance/get/empCodes/by/EmpCode/"+EmpCode+"/CompanyID/"+CompanyID);
            try
            {
                var result = AttendenceApplication.GetByReportTo(EmpCode, CompanyID);
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendance/assignweakend")]
        public IActionResult assignweakend(List<WeekEndSetupFoShiftrmList> shiftInfoList)
        {
            Response response = new Response("/attendance/assignweakend");
            try

            {
                response.Status = AttendenceApplication.assignweakend(shiftInfoList);
                response.Result = (response.Status) ? "Shift Assigned Successfully" : "Failed to Assign Shift";
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
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/IsDeleteAssigned")]
        public IActionResult IsDeleteAssigned(shiftDelete modal)
        {
            Response response = new Response("/attendance/shiftAssign/IsDeleteAssigned");
            try
            {
                var days = AttendenceApplication.IsDeleteAssigned(modal);
                response.Status = true;
                response.Result = "Shift Assigned Delete Successfully";
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
        [Route("api/v{version:apiVersion}/attendance/shiftAssign/GetDayOfWeekendInfo")]
        public IActionResult GetDayOfWeekendInfo(string startDate, string endDate, string shiftName, string weekDay)
        {
            Response response = new Response("/attendance/shiftAssign/GetDayOfWeekendInfo");
            try
            {
                var days = AttendenceApplication.GetDayOfWeekendInfo(startDate, endDate, shiftName, weekDay);
                response.Status = days.Count > 0;
                response.Result = (days.Count > 0) ? days : (object)"No data found";
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
