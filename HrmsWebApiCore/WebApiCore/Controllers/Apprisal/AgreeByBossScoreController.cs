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
    public class AgreeByBossScoreController : ControllerBase
    {
        private readonly ScoreByBossDb _appriasal;
        public AgreeByBossScoreController()
        {
            _appriasal = new ScoreByBossDb();
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/apprisal/agreebybossscore/getEmpScoreAchievement")]
        public IActionResult GetEmpScoreAchievement()
        {
            var reqParam = HttpContext.Request.Query;


            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            string reportTo = reqParam["empCode"];

            Response response = new Response("/apprisal/agreebybossscore/getEmpScoreAchievement");
            var result = _appriasal.GetEmpScoreAchievement(quarterId, yearId, reportTo);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybossscore/getAllEmpScoreAchievement")]
        public IActionResult GetAllEmpScoreAchievement()
        {
            var reqParam = HttpContext.Request.Query;


            int quarterId = Convert.ToInt32(reqParam["quarterId"]);
            int yearId = Convert.ToInt32(reqParam["yearId"]);
            string reportTo = reqParam["empCode"];

            Response response = new Response("/apprisal/agreebybossscore/getAllEmpScoreAchievement");
            var result = _appriasal.GetAllEmpScoreAchievement(quarterId, yearId, reportTo);
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybossscore/updateKpiScoreByBoss")]
        public IActionResult UpdateKpiScoreByBoss(List<KpiScoreAchievement> entities)
        {
            Response response = new Response("/apprisal/agreebybossscore/updateKpiScoreByBoss");
            response.Status = EmpWiseKpiDb.UpdateKpiScoreByBoss(entities);
            try
            {


                if (response.Status)
                {
                    response.Result = "Update By Boss...";
                }
                else
                {
                    response.Result = "Failed to Update By Boss...";
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
        [Route("api/v{version:apiVersion}/apprisal/agreebybossscore/EmpCode/Year")]
        public IActionResult ScorebyEmpCodeYear()
        {
            var reqParam = HttpContext.Request.Query;

            int yearId = Convert.ToInt32(reqParam["yearId"]);
            string empCode = reqParam["empCode"];

            Response response = new Response("/apprisal/agreebybossscore/EmpCode/Year");
            try
            {
                var result = _appriasal.GetPresentAvarage(yearId, empCode);
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
                return Ok(response);
            }
        }

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/apprisal/score/reset")]
        public IActionResult ResetAppriasal(string empCode, int yearId, int quarterId, int companyId, int userId)
        {
            try
            {
                _appriasal.ResetAppriasal(empCode, yearId, quarterId, companyId, userId);
                return Ok(new { Status = true, Result = "Success" });
            }
            catch(Exception err)
            {
                return Ok(new { Status = false, Result = err.Message });
            }
        }
    }
}