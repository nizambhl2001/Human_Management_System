using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.HR
{
    [Authorize()]
    [ApiController]
    public class UploadDocumentController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/certificate/upload")]
        public IActionResult Insert(CertificateUpload upload)
        {
            Response response = new Response("/hr/certificate/upload");
            try
            {
                var result = UploadCertificate.Insert(upload);
                if (result)
                {
                    if (upload.ID == null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail to Save";
                }
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
        [Route("api/v{version:apiVersion}/hr/certificate/getById/id/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/hr/certificate/getById/id/" + id);
            var result = UploadCertificate.getByID(id);
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
        [Route("api/v{version:apiVersion}/hr/certificate/getByempCode/EmpCode/{EmpCode}/CompanyID/{CompanyID}")]
        public IActionResult Insert(string EmpCode,int CompanyID)
        {
            Response response = new Response("/hr/certificate/getByempCode/EmpCode/"+EmpCode+"/CompanyID/"+CompanyID);
            try
            {
                var result = UploadCertificate.getByEmpCode(EmpCode,CompanyID);
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
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/hr/upload/document")]
        public IActionResult UploadDocument(UploadDocumentModel upload)
        {
            Response response = new Response("/hr/upload/document");
            try
            {
                var result = UploadCertificate.UploadDocuments(upload);
                if (result)
                {
                    if (upload.ID == null)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail to Save";
                }
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
        [Route("api/v{version:apiVersion}/hr/upload/document/getby/EmpCode/{EmpCode}")]
        public IActionResult getUploadDocByEmpCode(string EmpCode)
        {
            Response response = new Response("/hr/upload/document/getby/EmpCode/" + EmpCode );
            try
            {
                var result = UploadCertificate.getAllDocumentByEmpCode(EmpCode);
                if (result != null)
                {
                    response.Status = true;
                    response.Result = result;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No Data Found";
                }
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