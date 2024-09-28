using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Attendance;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.Helper;
using WebApiCore.Models.Attendance;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Attendence;

namespace WebApiCore.Controllers.Attendance
{
    [Authorize()]
    [ApiVersion("1")]

    public partial class AttendenceApplicationController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly FileOperation _fileOperation;
        public AttendenceApplicationController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
            _fileOperation = new FileOperation();
        }


        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/attendenceapplication/save/{poption}")]
        public IActionResult SaveOrUpdate(int poption, AttendenceApplicationModel attendenceModel)
        {
            Response response = new Response("/attendence/attendenceapplication/save/{poption}");

            try
            {
                if (attendenceModel.ID == 0)
                {
                    response.Status = AttendenceApplication.SaveOrUpdateAttendence(poption, attendenceModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = AttendenceApplication.SaveOrUpdateAttendence(poption, attendenceModel);
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
        [Route("api/v{version:apiVersion}/attendence/attendenceapplication/getbyempcode/empcode/{empcode}/comid/{comid}/poption/{poption}")]
        public IActionResult GetAttendenceByEmpCode(string empcode, int comid, int poption)
        {
            Response response = new Response("/attendence/attendenceapplication/getbyempcode/empcode/{empcode}/comid/{comid}/poption/{poption}");
            var result = AttendenceApplication.GetAttendenceByEmpCodeAndComId(empcode, comid, poption);
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
        [Route("api/v{version:apiVersion}/attendence/attendenceapplication/getbyid/id/{id}")]
        public IActionResult GetByidAttendenceApplication(int id)
        {
            Response response = new Response("/attendence/attendenceapplication/getbyid/id/{id}");
            var result = AttendenceApplication.GetByIdAttendenceApplication(id);
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


        //======================================================= WeekEnd Setup ====================================================================
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/weekendsetup/poptions/{poption}")]
        public IActionResult GetWeekEndSetupList(WeekEndSetupModel weekEndSetupModel, int poption)
        {
            Response response = new Response("/attendence/weekendsetup/poptions/{poption}");
            var result = AttendenceApplication.GetAllWeekEndSetupList(weekEndSetupModel, poption);
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
        //  Save WeekEndSetup 
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/weekendsetup/saveweekend/poptions/{poption}")]
        public IActionResult SaveWeekEndSetup(WeekEndSetupModel weekEndSetupModel, int poption)
        {
            Response response = new Response("/attendence/weekendsetup/saveweekend/poptions/{poption}");

            try
            {
                response.Status = AttendenceApplication.SaveWeekEndSetup(weekEndSetupModel, poption);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
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
        //  Save WeekEndSetup 
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/weekendsetup/getWeekEndShift")]
        public IActionResult getWeekEndShift(WeekEndSetupFoShiftrmList weekEndSetupModel)
        {
            Response response = new Response("/attendence/weekendsetup/getWeekEndShift");

            try
            {
                var result = AttendenceApplication.getWeekEndShift(weekEndSetupModel);
              
                    response.Status = true;
                    response.Result = result;
            
              
                return Ok(response);
            }
            catch (Exception err)
            {

                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //======================================================== Manual Attendence ===============================================================

        // Save Manual Attendence

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/manualattendence/saveorupdateattendence")]
        public IActionResult SaveOrUpdateAttendence(ManualAttendenceModel attnModel)
        {
            Response response = new Response("/attendence/manualattendence/saveorupdateattendence");

            try
            {
                
                    response.Status = AttendenceApplication.SaveOrUpdateManualAttendence(attnModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
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
        // get AttendenceDetails List by DDMMYYYY 
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendence/manualattendence/getbyddmmyy/ddmmyy/")]
        public IActionResult GetAttendenceListByDDMMYY()
        {
            Response response = new Response("/attendence/manualattendence/getbyddmmyy/ddmmyy/");

            try
            {
                var reqParam = HttpContext.Request.Query;
                string ddmmyyyy = reqParam["ddmmyyyy"];

                var result = AttendenceApplication.GetManualAttnByDDYYMM(ddmmyyyy);
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
        [Route("api/v{version:apiVersion}/attendence/manualattendence/getbyid/{id}")]
        public IActionResult GetManualAttendenceById(int id)
        {
            Response response = new Response("/attendence/manualattendence/getbyid/{id}");

            try
            {
                var result = AttendenceApplication.GetManualAttendenceById(id);
                if (result != null)
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/attendence/manualattendence/deletebyid/{id}")]
        public IActionResult DeleteManualAttendenceById(int id)
        {
            Response response = new Response("/attendence/manualattendence/deletebyid/{id}");

            try
            {
                response.Status = AttendenceApplication.DeleteManualAttendence(id);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Delete Successfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to Delete";
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


        //======================================================== Monthly Attendence==============================================================

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendence/monthlyattendence/getallperiodlist/{id}")]
        public IActionResult GetSalaryPeriodList(int id)
        {
            Response response = new Response("/attendence/monthlyattendence/getallperiodlist/{id}");

            try
            {
                var result = AttendenceApplication.GetAllPeriodNameByYearID(id);
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


        // Show Attendence Report Data 
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/attendenceReport/showAttendenceReportData")]
        public IActionResult GetAttendenceReportData(AttendanceReportModel attendanceModel)
        {
            Response response = new Response("/attendence/attendenceReport/showAttendenceReportData");

            try
            {
                var result = AttendenceApplication.GetAttendenceReportData(attendanceModel);
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

        // Show Attendence Data 
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/monthlyattendence/getshowdata")]
        public IActionResult GetAttSummery(AttendenceSummeryModel summeryModel)
        {
            Response response = new Response("/attendence/monthlyattendence/getshowdata");

            try
            {
                var result = AttendenceApplication.GetAttendenceData(summeryModel);
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
        [Route("api/v{version:apiVersion}/attendence/getAttSummeryAsXl")]
        public IActionResult GetAttSummeryAsExcel(List<AttendenceSummaryViewModel> attSummery)
        {
           
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            string fileName = "attSummery" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
            try
            {
                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet worksheet = workbook.Worksheets.Add("AttendanceSummery");

                    int companyId = (attSummery.Count == 0) ? 1 : attSummery[0].CompanyID;
                    var company = Company.Get(companyId);

                    var companyRange = worksheet.Range("A1:L1").Merge();
                    companyRange.Value = company.CompanyName;
                    companyRange.Style.Font.SetBold().Font.FontSize = 14;
                    companyRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    companyRange.Style.Font.Bold = true;

                    var addressRange = worksheet.Range("A2:L2").Merge();
                    addressRange.Value = company.CompanyAddress;
                    addressRange.Style.Font.FontSize = 12;
                    addressRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    var titleRange = worksheet.Range("A3:L3").Merge();
                    titleRange.Value = "Attendance Summery";
                    titleRange.Style.Font.SetBold().Font.FontSize = 13;
                    titleRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    titleRange.Style.Font.Bold = true;

                    var titleRange2 = worksheet.Range("A4:L4").Merge();
                    titleRange2.Value = (attSummery.Count>0)? $"From {attSummery[0].StartDate.ToString("dd/MM/yyyy")} To {attSummery[0].EndDate.ToString("dd/MM/yyyy")}":"";
                    titleRange2.Style.Font.FontSize = 13;
                    titleRange2.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    worksheet.Cell(6, 1).Value = "SN";
                    worksheet.Cell(6, 2).Value = "Code";
                    worksheet.Cell(6, 3).Value = "Name";
                    worksheet.Cell(6, 4).Value = "Designation";
                    worksheet.Cell(6, 5).Value = "Department";
                    worksheet.Cell(6, 6).Value = "Working_Day";
                    worksheet.Cell(6, 7).Value = "Attendance";
                    worksheet.Cell(6, 8).Value = "With_Pay";
                    worksheet.Cell(6, 9).Value = "Without_Pay";
                    worksheet.Cell(6, 10).Value = "Holiday";
                    worksheet.Cell(6, 11).Value = "Absent";
                    worksheet.Cell(6, 12).Value = "Remark";
                    worksheet.Range("A6:L6").Style.Font.Bold = true;
                    worksheet.Range("A6:L6").Style.Fill.BackgroundColor = XLColor.DarkCyan;
                    worksheet.Range("A6:L6").Style.Font.FontColor = XLColor.White;
                    worksheet.Range("A6:L6").Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A6:L6").Style.Border.InsideBorderColor = XLColor.White;

                    for (int row = 7; row < attSummery.Count + 7; row++)
                    {
                        worksheet.Cell(row, 1).Value = (row - 7) + 1;
                        worksheet.Cell(row, 2).Value = attSummery[row - 7].EmpCode;
                        worksheet.Cell(row, 3).Value = attSummery[row - 7].EmpName;
                        worksheet.Cell(row, 4).Value = attSummery[row - 7].Designation;
                        worksheet.Cell(row, 5).Value = attSummery[row - 7].Department;
                        worksheet.Cell(row, 6).Value = attSummery[row - 7].TotalDay;
                        worksheet.Cell(row, 7).Value = attSummery[row - 7].AttendenceDay;
                        worksheet.Cell(row, 8).Value = attSummery[row - 7].LeaveWithPay;
                        worksheet.Cell(row, 9).Value = attSummery[row - 7].LeavewithOutPay;
                        worksheet.Cell(row, 10).Value = attSummery[row - 7].Holiday;
                        worksheet.Cell(row, 11).Value = attSummery[row - 7].Absent;
                        worksheet.Cell(row, 12).Value = attSummery[row - 7].Remarks;
                    }
                    worksheet.Columns("A:A").Width = 5;
                    worksheet.Columns("B:B").Width = 10;
                    worksheet.Columns("C:E").Width = 25;
                    worksheet.Columns("F:K").Width = 12;
                    worksheet.Columns("L:L").Width = 30;
                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(content, contentType, fileName);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ForEdit Monthly Attendence 

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/monthlyattendence/foreditmonthlyattendence")]
        public IActionResult ForEditMonthlyAttendence(AttendenceSummeryModel summeryModel)
        {
            Response response = new Response("/attendence/monthlyattendence/foreditmonthlyattendence");

            try
            {
                var result = AttendenceApplication.ForEditMonthlyAttendence(summeryModel);
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

        // Save Monthly Attendence
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/monthlyattendence/savemonthlyattendence")]
        public IActionResult SaveMonthlyAttendence(AttendenceSummeryModel summeryModel)
        {
            Response response = new Response("/attendence/monthlyattendence/savemonthlyattendence");

            try
            {
                response.Status = AttendenceApplication.SaveMonthlyAttendence(summeryModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Data Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed ";
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

        //============================================================ Process Attendence Data =====================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendence/processattendencedata/process/strDate/{strDate}/endDate/{endDate}/comid/{comid}/branch/{branch}")]
        public IActionResult ProcessAttendenceData(string strDate, string endDate, int comid, int branch)
        {
            Response response = new Response("/attendence/processattendencedata/process/strDate/{strDate}/endDate/{endDate}/comid/{comid}/branch/{branch}");

            try
            {
                response.Status = AttendenceApplication.ProcessAttendenceData(strDate, endDate ,comid, branch);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Process Attendence Data Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Process Attendence Data";
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



        //============================================================ Process summery Attendence Data =====================================================

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendance/ProcessAttendenceSummery")]
        public IActionResult ProcessAttendenceSummery(string strDate, string endDate, int periodId, int compId)
        {
            var param = HttpContext.Request.Query;
            strDate = param["strDate"];
            endDate = param["endDate"];
            periodId = Convert.ToInt32(param["periodId"]);
            compId = Convert.ToInt32(param["compId"]);

            Response response = new Response("/attendance/ProcessAttendenceSummery");

            try
            {
                response.Status = AttendenceApplication.ProcessAttendanceSummery(strDate, endDate, periodId, compId);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Process Attendence Summery Data Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Process Attendence Summery Data";
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

        //============================================================ Process Late Comer Data =====================================================

        [HttpGet]
        [Route("api/v{version:apiVersion}/attendance/lateComerReportProcess")]
        public IActionResult ProcessLateComer(string strDate, string endDate, int gradeVal, int compId)
        {
            var param = HttpContext.Request.Query;
            strDate = param["strDate"];
            endDate = param["endDate"];
            gradeVal = Convert.ToInt32(param["gradeVal"]);
            compId = Convert.ToInt32(param["compId"]);

            Response response = new Response("/attendance/lateComerReportProcess");

            try
            {
                response.Status = AttendenceApplication.ProcessLateComerReport(strDate, endDate, gradeVal, compId);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Process Late Comer Data Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Process LateComer Data";
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
        //==================================== Delete Existing Attendence =================================
        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/attendence/delete/existing/attendanceData/periodId/{periodId}/compId/{compId}")]
        public IActionResult DeleteExistingAttendance(int periodId, int compId)
        {
            Response response = new Response("/attendence/delete/existing/attendanceData/periodId/{periodId}/compId/{compId}");

            try
            {
                response.Status = AttendenceApplication.DeleteExestingAttandence(periodId, compId);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Deleted";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Delete";
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
        //==================================== Import Employee Attendence =================================
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/importemployeeattendence")]
        public IActionResult ImportEmployeeAttendece()
        {
            var reqParam = HttpContext.Request.Query;
            List<IFormFile> excelFiles = HttpContext.Request.Form.Files.ToList();
            Response response = new Response("/attendence/importemployeeattendence");
            try
            {
                ImportEmployeeAttendence model = new ImportEmployeeAttendence
                {
                    ID = Convert.ToInt32(reqParam["ID"]),
                    CompanyID = Convert.ToInt32(reqParam["CompanyID"]),
                    EmpCode = (reqParam["EmpCode"]),
                    TerminalID = Convert.ToInt32(reqParam["TerminalID"]),
                };
                List<dynamic> excelData = _fileOperation.UploadExcelFile(excelFiles, _hostingEnvironment.ContentRootPath, 1, 1);
                response.Status = AttendenceApplication.ImportEmployeeAttendence(model, excelData);
                if (response.Status)
                {
                    response.Result = "Employee Attendence Data Import Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Import File & Data ";
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



        // =============================================== Appove Attendence ===============================================================================
        // Get Application Attendence List for Approve
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/attendence/attendenceapprove/applicationlist/comid/{comid}/reqto/{reqto}/poption/{poption}")]
        public IActionResult GetApplicationAttendenceListForApprove(int comid, string reqto, int poption)
        {
            Response response = new Response("/attendence/attendenceapprove/applicationlist/comid/{comid}/reqto/{reqto}/poption/{poption}");
            var result = AttendenceApplication.GetApplicationAttendenceListForApporve(comid, reqto, poption);
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


        // Approve Attendence Application
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/attendence/approveattendence/approve")]
        public IActionResult ApproveAttendenceApplication(AttendenceApproveViewModel attendenceApprove)
        {
            Response response = new Response("/attendence/approveattendence/approve");

            try
            {
                if (attendenceApprove.POption == 7)
                {
                    response.Status = AttendenceApplication.ApproveAttendenceApplication(attendenceApprove);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Approve Attendence Succesfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Approve ";

                    }
                    return Ok(response);
                }
                else if (attendenceApprove.POption == 6)
                {
                    response.Status = AttendenceApplication.RecommendApplayAttendanceInfo(attendenceApprove);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Recommend Attendence Application Succesfull";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Recommend ";

                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = AttendenceApplication.CancelApplicationAttendanceInfo(attendenceApprove);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Cancel Attendence Application Succesfull";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Cancel ";

                    }
                    return Ok(response);
                }

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