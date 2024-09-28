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
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class AgreeByBossKpiController : ControllerBase
    {
        private readonly AgreeByBossDb _agreeByBoss;
        public AgreeByBossKpiController()
        {
            _agreeByBoss = new AgreeByBossDb();
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getQuarter")]
        public IActionResult GetQuarter()
        {
            Response response = new Response("/apprisal/AgreeByBossKpi/getQuarter");
            var result = _agreeByBoss.GetQuarter();
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getReportToEmp")]
        public IActionResult GetgetReportToEmp()
        {
            var reqParam = HttpContext.Request.Query;

            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            string reportTo = reqParam["reportTo"];

            Response response = new Response("/apprisal/AgreeByBossKpi/getReportToEmp");
            var result = _agreeByBoss.GetReportToEmp(quarterId, yearId, reportTo);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getAllReportToEmp")]
        public IActionResult GetAllReportToEmp()
        {
            var reqParam = HttpContext.Request.Query;

            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            string reportTo = reqParam["reportTo"];

            Response response = new Response("/apprisal/AgreeByBossKpi/getAllReportToEmp");
            var result = _agreeByBoss.GetAllReportToEmp(quarterId, yearId, reportTo);
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
        [AllowAnonymous]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getEmpCode/companyId/{companyId}/empCode/{empCode}")]
        public IActionResult GetEmpCode(int companyId, string empCode)
        {
            Response response = new Response("/apprisal/AgreeByBossKpi/getEmpCode/companyId/" + companyId + "/empCode/" + empCode);
            var result = _agreeByBoss.GetEmpCode(companyId, empCode);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/kpiUpdateByBoss")]
        public IActionResult KpiUpdateByBoss(List<KPISetupEmployeeWise> entities)
        {
            Response response = new Response("/apprisal/agreebybosskpi/kpiUpdateByBoss");
            response.Status = _agreeByBoss.KpiUpdateByBoss(entities);
            try
            {
                if (response.Status)
                {
                    response.Result = "Kpi Edited By Boss.";
                }
                else
                {
                    response.Result = "Failed to edited the Kpi.";
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/agreeByBoss")]
        public IActionResult AgreeByBoss(KPISetupEmployeeWise entities)
        {
            Response response = new Response("/apprisal/agreebybosskpi/agreeByBoss");
            response.Status = _agreeByBoss.AgreeByBoss(entities);
            try
            {
                if (response.Status)
                {
                    response.Result = "Kpi Agree by boss.";
                }
                else
                {
                    response.Result = "Something is not ok";
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getBusinessKpi")]
        public IActionResult GetBusinessKpi()
        {
            var paramReq = HttpContext.Request.Query;

            string empCode = paramReq["empCode"];
            int yearId = Convert.ToInt32(paramReq["yearId"]);
            int quarterId = Convert.ToInt32(paramReq["quarterId"]);
            int companyId = Convert.ToInt32(paramReq["companyId"]);

            Response res = new Response("/apprisal/agreebybosskpi/getBusinessKpi");
            var result = _agreeByBoss.GetBusinessKpi(empCode,yearId,quarterId,companyId);
            try
            {
                if (result != null)
                {
                    res.Status = true;
                    res.Result = result;
                }
                else
                {
                    res.Status = false;
                    res.Result = "Record not Found";
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getPeopleKpi")]
        public IActionResult GetPeopleKpi()
        {
            var paramReq = HttpContext.Request.Query;

            string empCode = paramReq["empCode"];
            int yearId = Convert.ToInt32(paramReq["yearId"]);
            int quarterId = Convert.ToInt32(paramReq["quarterId"]);
            int companyId = Convert.ToInt32(paramReq["companyId"]);

            Response res = new Response("/apprisal/agreebybosskpi/getPeopleKpi");
            var result = _agreeByBoss.GetPeopleKpi(empCode, yearId, quarterId, companyId);
            try
            {
                if (result != null)
                {
                    res.Status = true;
                    res.Result = result;
                }
                else
                {
                    res.Status = false;
                    res.Result = "Record not Found";
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/saveScoreAchievement")]
        public IActionResult SaveScoreAchievement(List<KpiScoreAchievement> entites)
        {
            Response response = new Response("/apprisal/agreebybosskpi/saveScoreAchievement");
            response.Status = _agreeByBoss.SaveAchievementScore(entites);
            try
            {
                if (response.Status)
                {
                    response.Result = "Achievement Score Save Successfully.";
                }
                else
                {
                    response.Result = "Something is not ok";
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
        //Recommendation
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getEmpInfo/companyId/{companyId}/empCode/{empCode}/yearId/{yearId}")]
        public IActionResult GetEmpInfo(int companyId, string empCode, int yearId)
        {
            Response response = new Response("/apprisal/agreebybosskpi/getEmpInfo/companyId/" + companyId + "/empCode/" + empCode+ "/yearId/" + yearId);
            var result = _agreeByBoss.GetEmpInfo(companyId, empCode, yearId);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getEmpApprisalHistory/companyId/{companyId}/empCode/{empCode}/yearId/{yearId}")]
        public IActionResult GetEmpApprisalHistory(int companyId, string empCode, int yearId)
        {
            Response response = new Response("/apprisal/agreebybosskpi/getEmpApprisalHistory/companyId/" + companyId + "/empCode/" + empCode + "/yearId/" + yearId);
            var result = _agreeByBoss.GetEmpApprisalHistory(companyId, empCode, yearId);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/getAgreeStatusForRecommendation/yearId/{yearId}/reportTo/{reportTo}")]
        public IActionResult GetAgreeStatusForRecommendation(int yearId, string reportTo)
        {
            Response response = new Response("/apprisal/agreebybosskpi/getAgreeStatusForRecommendation/yearId/" + yearId + "/reportTo/" + reportTo);
            var result = _agreeByBoss.GetAgreeStatusForRecommendation(yearId, reportTo);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybosskpi/SaveEmpRecommendation")]
        public IActionResult SaveEmpRecommendation(KpiScoreAchievement entity)
        {
            Response response = new Response("/apprisal/agreebybosskpi/SaveEmpRecommendation");
            response.Status = _agreeByBoss.SaveEmpRecommendation(entity);
            try
            {
                if (response.Status)
                {
                    response.Result = "Execute Successfully";
                }
                else
                {
                    response.Result = "Something is not ok";
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/apprisal/kpi/reset")]
        public IActionResult ResetKpi(string empCode, int yearId, int quarterId, int companyId, int userId)
        {
            try
            {
                _agreeByBoss.ResetKpi(empCode, yearId, quarterId, companyId, userId);
                return Ok(new { Status = true, Result = "Success" });
            }
            catch (Exception err)
            {
                return Ok(new { Status = false, Result = err.Message });
            }
        }
    }
}