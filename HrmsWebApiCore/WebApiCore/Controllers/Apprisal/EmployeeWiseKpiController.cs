using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.Apprisal;
using WebApiCore.Models.Apprisal;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.Apprisal
{
    [Authorize(Roles = "Admin, SuperAdmin,User,Employee")]
    [ApiVersion("1")]
    [ApiController]
    public class EmployeeWiseKpiController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/empwisekpi/getBusinessResult")]
        public IActionResult GetBusinessResult()
        {
            var reqParam = HttpContext.Request.Query;

            string empCode = reqParam["empCode"];
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int companyId = Convert.ToInt32(reqParam["companyId"]);

            Response response = new Response("/apprisal/empwisekpi/getBusinessResult");
            var result = EmpWiseKpiDb.GetBusinessResult(empCode, yearId,  quarterId,  companyId);
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
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/empwisekpi/getPeopleResult")]
        public IActionResult GetPeopleResult()
        {
            var reqParam = HttpContext.Request.Query;

            string empCode = reqParam["empCode"];
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int companyId = Convert.ToInt32(reqParam["companyId"]);

            Response response = new Response("/apprisal/empwisekpi/getPeopleResult");
            var result = EmpWiseKpiDb.GetPeopleResult(empCode, yearId, quarterId, companyId);
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
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/apprisal/empwisekpi/saveUpdateEmpWiseKpi")]
        public IActionResult SaveUpdateEmpWiseKpi(List<KPISetupEmployeeWise> entities)
        {
            Response response = new Response("/apprisal/empwisekpi/saveUpdateEmpWiseKpi");
            try
            {
                response.Status = EmpWiseKpiDb.SaveUpdateEmpWiseKpi(entities);

                if (response.Status)
                    {
                        response.Result = "Kpi Setup Successfully.";
                    }
                    else
                    {
                        response.Result = "Failed to Setup Kpi!";
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
        [Route("api/v{version:apiVersion}/apprisal/empwisekpi/updateEmpWiseKpiForAgree")]
        public IActionResult UpdateEmpWiseKpiForAgree(KPISetupEmployeeWise entities)
        {
            Response response = new Response("/apprisal/empwisekpi/updateEmpWiseKpiForAgree")
            {
                Status = EmpWiseKpiDb.UpdateEmpWiseKpiForAgree(entities)
            };
            try
            {


                if (response.Status)
                {
                    response.Result = "Agree By Employee...";
                }
                else
                {
                    response.Result = "Failed to Agree By Employee...";
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

        //===============================================  Mostafij  ======================================================================
        //[Authorize()]
        //[HttpGet]
        //[Route("api/v{version:apiVersion}/apprisal/empwisekpi/getallkpilist")]
        //public IActionResult GetAllKpiList( )
        //{
        //    Response response = new Response("/apprisal/empwisekpi/getallkpilist");
        //   var result = EmpWiseKpiDb.GetAllKpiList();
        //    try
        //    {


        //        if (result.Count>0)
        //        {
        //            response.Status = true;
        //            response.Result = result;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "Data Not Found";
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

    }
}