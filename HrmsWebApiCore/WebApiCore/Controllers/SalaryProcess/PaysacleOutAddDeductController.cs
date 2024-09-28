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
    public class PaysacleOutAddDeductController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/salaryprocess/paysacleoutdeduct/get/{empcode}/{comid}")]
        public IActionResult getPaysacleOutAddDeductList(string empcode,int comid)
        {
            Response response = new Response("/salaryprocess/paysacleoutdeduct/get/{empcode}/{comid}");
            var result = PaysacleOutAddDeduct.getGetEmpPaysacleOutAddDeduct(empcode, comid);
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

                response.Status = true;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/salaryprocess/paysacleoutdeduct/save")]
        public IActionResult SavePayScaleDeduct(PaysacleOutAddDeductModel deductModel)
        {
            Response response = new Response("/salaryprocess/paysacleoutdeduct/save");
            response.Status = PaysacleOutAddDeduct.savePayScaleAddDeduct(deductModel);
            try
            {
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Data Save Succesfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Failed To Save";
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
        [HttpPut]
        [Route("api/v{version:apiVersion}/salaryprocess/paysacleoutdeduct/update")]
        public IActionResult UpdatePayScaleDeduct(PaysacleOutAddDeductModel deductModel)
        {
            Response response = new Response("/salaryprocess/paysacleoutdeduct/update");
            response.Status = PaysacleOutAddDeduct.updatePayScaleDeduct(deductModel);
            try
            {
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Data Update Succesfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Data Failed To Update";
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
        [Route("api/v{version:apiVersion}/salaryprocess/paysacleoutdeduct/getbyid/{id}/{empcode}/{comid}")]
        public IActionResult GetById(int id,string empcode, int comid)
        {
            Response response = new Response("/salaryprocess/paysacleoutdeduct/get/{empcode}/{comid}");
           
            try
            {
                var result = PaysacleOutAddDeduct.getById(id, empcode, comid);
                if (result!=null)
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

                response.Status = true;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/salaryprocess/paysacleoutdeduct/delete/{comid}/{empcode}/{id}")]
        public IActionResult DeletePayscale(int comid, string empcode, int id)
        {
            Response response = new Response("/salaryprocess/paysacleoutdeduct/delete/{comid}/{empcode}/{id}");

            try
            {
               response.Status = PaysacleOutAddDeduct.deletePayscaleAddDeduct(comid,empcode,id);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Deleted Successfully";
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


    }
}