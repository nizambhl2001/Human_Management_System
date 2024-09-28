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
    public class SalaryProcessController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/payscalelist/get/{gradename}")]
        public IActionResult PayScaleList(string gradename)
        {
            Response response = new Response("/salaryprocess/payscalelist/get");
            var result = EmpEnrolment.payScaleList(gradename);
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
                }return Ok(response);
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
        [Route("api/v{version:apiVersion}/salaryprocess/empenrolmentinfo/saveupdate")]
        public IActionResult SaveUpdate(EmpEnrolmentModel enrolmentModel)
        {
            Response response = new Response("/salaryprocess/empenrolmentinfo/saveupdate");

            try
            {
                if (enrolmentModel.ID == 0)
                {
                    //var checkIfExist = EmpEnrolment.enrolmentDuplicateCheck(enrolmentModel.EmpCode, enrolmentModel.Bank, enrolmentModel.CompanyID);
                    //if (checkIfExist.Count > 0)
                    //{
                    //    response.Status = false;
                    //    response.Result = "Employee already exists";

                    //}
                    //else
                    //{
                        response.Status = EmpEnrolment.saveUpdate(enrolmentModel);

                        if (response.Status)
                        {
                            response.Status = true;
                            response.Result = "Update Successful";
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Failed To Update!!";
                        }

                    //}
                    return Ok(response);


                }
                else
                {
                    response.Status = EmpEnrolment.saveUpdate(enrolmentModel);

                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successful";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update!!";
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
        [Route("api/v{version:apiVersion}/salaryprocess/enrolment/getbyid/{empcode}/{comid}")]
        public IActionResult GetById(string empcode,int comid)
        {
            Response response = new Response("/salaryprocess/enrolment/getbyid/{empcode}/{comid}");
          
            try
            {
                var result = EmpEnrolment.getById(empcode, comid);
                if (result.Count>0)
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


        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/enrolment/getall")]
        public IActionResult GetAllEmpEnrolmentList(int companyId,string empCode, int gradeValue, int departmentId)
        {
            Response response = new Response("/salaryprocess/enrolment/getall");
            var result = EmpEnrolment.GetEnrolments(companyId,empCode,gradeValue,departmentId);
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
        [Route("api/v{version:apiVersion}/salaryprocess/enrolment/getbyidedit/{id}/{empcode}")]
        public IActionResult GetByIdEdit(int id,string empcode)
        {
            Response response = new Response("/salaryprocess/enrolment/getbyid/{id}/{empcode}");

            try
            {
                var result = EmpEnrolment.GetByIdEdit(id,empcode);
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


        //======================================================== Salary Process Section =====================================================

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryProcess/process")]
        public IActionResult ProcessSalary(SalaryProcessModel processModel)
        {
            Response response = new Response("/salaryprocess/processsalary/process");
            try
            {
                int processedEmployee = SalaryProcessDB.Process(processModel);
                response.Status = processedEmployee > 0;
                response.Result = processedEmployee ;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        
        
        /////////// Setu //////////////////////////////////
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/deleteExistingPayslip")]
        public IActionResult DeleteExistingPayslip(SalaryProcessModel payslip)
        {
            Response response = new Response("/salaryprocess/deleteExistingPayslip");
            try
            {
                response.Status = SalaryProcessDB.DeleteExistingPayslip(payslip);

                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Payslip Deleted";
                    
                }
                else
                {
                    response.Status = false;
                    response.Result = "Delete Failed";
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
        [Route("api/v{version:apiVersion}/salaryprocess/GetGeneralinfoForPayslip")]
        public IActionResult GetGeneralinfoForPayslip()
        {

            var reqParam = HttpContext.Request.Query;

            string empCode = reqParam["empCode"];
            int companyId = Convert.ToInt32(reqParam["companyId"]);
            int gradeValue = Convert.ToInt32(reqParam["gradeValue"]);

            Response response = new Response("/salaryprocess/GetGeneralinfoForPayslip");

            try
            {
                var result = SalaryProcessDB.GetGeneralinfoForPayslip(empCode, companyId, gradeValue);
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

    }
}