using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Addition;
using WebApiCore.Models;
using WebApiCore.Models.Addition;
using WebApiCore.ViewModels;


namespace WebApiCore.Controllers.Addition
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class ProcessImportController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/processimport/getall")]
        public IActionResult GetAll(AdditionNDDeductionGetAllParam procImp)
        {
            Response response=new Response("/processimport/getall");
            try
            {
                var result = ProcessImportDb.GetAllProcImport(procImp);
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/processimport/importedsalryhead/periodid/{periodID}/compId/{companyID}")]
        public IActionResult GetAll( int periodID, int companyID)
        {
            Response response = new Response("/processimport/importedsalryhead/periodid/" + periodID + "/compId/" + companyID);
            try
            {
                var result = ProcessImportDb.GetImportedSalaryHead(periodID,companyID);
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
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/processimport/saveupdate/{type}")]
        public IActionResult SaveUpdate(ProcessImportAdditionModel procImport, string type)
        {
            Response response = new Response("/processimport/saveupdate/"+type);
            try
            {
                var result1 = ProcessImportDb.CheckSalaryPeriod(procImport);
                if (result1.Count > 0)
                {
                    response.Status = true;
                    response.Result = "This month salary already Locked";
                    return Ok(response);

                }
                else
                {
                    if (procImport.ID == 0)
                    {
                        bool result = ProcessImportDb.SaveUpdate(procImport, type);
                        if (result)
                        {
                            response.Status = true;
                            response.Result = "Successfully Save";
                            return Ok(response);
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Fail To Save";
                            return Ok(response);
                        }
                    }
                    else
                    {
                        bool result = ProcessImportDb.SaveUpdate(procImport, type);
                        if (result)
                        {
                            response.Status = true;
                            response.Result = "Successfully Update";
                            return Ok(response);
                        }
                        else
                        {
                            response.Status = false;
                            response.Result = "Fail To Update";
                            return Ok(response);
                        }
                    }

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