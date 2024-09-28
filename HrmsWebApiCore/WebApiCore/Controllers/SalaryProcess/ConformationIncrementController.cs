using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SalaryProcess;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.Helper;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.SalaryProcess
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ConformationIncrementController : ControllerBase
    {
        private readonly ConformationIncrement _incrementProcess;
        public ConformationIncrementController()
        {
            _incrementProcess = new ConformationIncrement();
        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/confirmationincrement/getbyid/{empcode}/{comid}")]
        public IActionResult GetById(string empcode, int comid)
        {
            Response response = new Response("/salaryprocess/confirmationincrement/getbyid/{empcode}/{comid}");

            try
            {
                var result = _incrementProcess.GetConorIncList(empcode, comid);
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
        [Route("api/v{version:apiVersion}/salaryprocess/confirmationincrement/getincrementtype")]


        public IActionResult GetIncrementType()
        {
            Response response = new Response("/salaryprocess/confirmationincrement/getincrementtype");

            try
            {
                var result = _incrementProcess.GetIncrementType();
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/getIncrementInfoAsExcel")]
        public IActionResult GetIncrementInfoAsExcel(List<ConformationIncrementModel> data)
        {
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            string fileName = "EmpIncrInfo" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
            try
            {
                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet worksheet =
                    workbook.Worksheets.Add("EmployeeIncrementInfo");

                    int companyId = (data.Count == 0) ? 1 : data[0].CompanyID;
                    var company = Company.Get(companyId);

                    var companyRange = worksheet.Range("A1:E1").Merge();
                    companyRange.Value = company.CompanyName;
                    companyRange.Style.Font.SetBold().Font.FontSize = 14;
                    companyRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    companyRange.Style.Font.Bold = true;

                    var addressRange = worksheet.Range("A2:E2").Merge();
                    addressRange.Value = company.CompanyAddress;
                    addressRange.Style.Font.FontSize = 12;
                    addressRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;


                    var range = worksheet.Range("A3:E3").Merge();
                    range.Value = "Employee Increment Info " + DateTime.Now.ToString("dd/MMM/yyyy");
                    range.Style.Font.FontSize = 13;
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    

                    worksheet.Cell(5, 1).Value = "EmpCode";
                    worksheet.Cell(5, 2).Value = "Name";
                    worksheet.Cell(5, 3).Value = "Current_PayScale";
                    worksheet.Cell(5, 4).Value = "Next_Incr_PayScale";
                    worksheet.Cell(5, 5).Value = "Prov_Fund";
                    worksheet.Range("A5:E5").Style.Font.Bold = true;
                    worksheet.Range("A5:E5").Style.Fill.BackgroundColor = XLColor.DarkCyan;
                    worksheet.Range("A5:E5").Style.Font.FontColor = XLColor.White;
                    worksheet.Range("A5:E5").Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A5:E5").Style.Border.InsideBorderColor = XLColor.White;
                    for (int row = 6; row < data.Count + 6; row++)
                    {
                        worksheet.Cell(row, 1).Value = data[row - 6].EmpCode;
                        worksheet.Cell(row, 2).Value = data[row - 6].EmpName;
                        worksheet.Cell(row, 3).Value = data[row - 6].PrePayScaleName;
                        worksheet.Cell(row, 4).Value = data[row - 6].IncrementPayScaleName;
                        worksheet.Cell(row, 5).Value = data[row - 6].ProvidentFund;
                    }
                    worksheet.Columns("A:A").Width = 10;
                    worksheet.Columns("B:B").Width = 25;
                    worksheet.Columns("C:D").Width = 20;
                    worksheet.Columns("E:E").Width = 10;
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


        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/confirmationincrement/saveconfirmationIncre")]
        public IActionResult SaveConfirmeIncrement(List<ConformationIncrementModel> incrementModel)
        {
            Response response = new Response("/salaryprocess/confirmationincrement/saveconfirmationIncre");

            try
            {
                response.Status = _incrementProcess.SaveConfirmIncrement(incrementModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Data Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failded to Save";
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
        [Route("api/v{version:apiVersion}/salaryprocess/confirmationincrement/delete/{id}/{comid}")]
        public IActionResult DeleteConfirmeIncrement(int id, int comid)
        {
            Response response = new Response("/salaryprocess/confirmationincrement/delete/{id}/{comid}");
            try
            {
                response.Status = _incrementProcess.DeleteConfirmIncrement(id, comid);
                if (response.Status)
                {
                    response.Result = "Delete Successful";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failded to Delete";
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