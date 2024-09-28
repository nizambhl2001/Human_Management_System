using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.FinalSattlement;
using WebApiCore.Models.FinalSattlement;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.FinalSattlement
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class FinalSattlementController : ControllerBase
    {

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/noticedaysetup/getall/comp/{companyID}/gradevalue/{gradeValue}/usertypeid/{userTypeID}")]
        public IActionResult getAllNoticeday(int companyID, int gradeValue,int userTypeID)
        {
            Response response = new Response("/finalsattlement/noticedaysetup/getall/comp/" + companyID + "/gradevalue/" + gradeValue+ "/usertypeid/" + userTypeID);
            try
            {
                var result = FinalSattlementDb.getAllNoticeDay(companyID, gradeValue, userTypeID);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/noticedaysetup/getallbyId/{id}")]
        public IActionResult getNoticeByID(int id)
        {
            Response response = new Response("/finalsattlement/noticedaysetup/getallbyId/" + id);
            try
            {
                var result = FinalSattlementDb.getNoticeDayByID(id);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route(
            "api/v{version:apiVersion}/finalsattlement/noticedaysetup/saveupdate")]
        public IActionResult saveUpdateNoticeDay(NoticeDaySetupModel noticeday)
        {
            Response response = new Response("/finalsattlement/noticedaysetup/saveupdate");
            try
            {
                if (noticeday.ID == 0)
                {
                    bool result = FinalSattlementDb.saveNoticeday(noticeday);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to save";
                    }

                    return Ok(response);
                }
                else
                {
                    bool result = FinalSattlementDb.saveNoticeday(noticeday);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Updated Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to update";
                    }

                    return Ok(response);

                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        //////////////////Notice Amount Setup///////////////
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/noticeamount/getall/comp/{companyID}/gradevalue/{gradeValue}/usertypeid/{userTypeID}")]
        public IActionResult getAllNoticeAmount(int companyID, int gradeValue,int userTypeID)
        {
            Response response = new Response("/finalsattlement/noticeamount/getall/comp/" + companyID + "/gradevalue/" + gradeValue+ "/usertypeid/" + userTypeID);
            try
            {
                var result = FinalSattlementDb.getAllNoticeAmount(companyID, gradeValue,userTypeID);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/noticeamount/getallbyId/{id}")]
        public IActionResult getNoticeAmountByID(int id)
        {
            Response response = new Response("/finalsattlement/noticeamount/getallbyId/" + id);
            try
            {
                var result = FinalSattlementDb.getNoticeAmountByID(id);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route(
            "api/v{version:apiVersion}/finalsattlement/noticeamount/saveupdate")]
        public IActionResult saveUpdateNoticeAmount(NoticeAmountSetupModel noticeamount)
        {
            Response response = new Response("/finalsattlement/noticeamount/saveupdate");
            try
            {
                if (noticeamount.ID == 0)
                {
                    bool result = FinalSattlementDb.saveNoticeAmount(noticeamount);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to save";
                    }

                    return Ok(response);
                }
                else
                {
                    bool result = FinalSattlementDb.saveNoticeAmount(noticeamount);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Updated Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to update";
                    }

                    return Ok(response);

                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }

        ///////////////////////////Gratuity Setup//////////////////
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/gratuity/getall/comp/{companyID}/gradevalue/{gradeValue}/usertypeid/{userTypeID}")]
        public IActionResult getAllGratuity(int companyID, int gradeValue,int userTypeID)
        {
            Response response = new Response("/finalsattlement/gratuity/getall/comp/" + companyID + "/gradevalue/" + gradeValue+ "/usertypeid/"+ userTypeID);
            try
            {
                var result = FinalSattlementDb.getAllGratuity(companyID, gradeValue, userTypeID);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/gratuity/getallbyId/{id}")]
        public IActionResult getGratuityByID(int id)
        {
            Response response = new Response("/finalsattlement/gratuity/getallbyId/" + id);
            try
            {
                var result = FinalSattlementDb.getGratuityByID(id);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route(
            "api/v{version:apiVersion}/finalsattlement/gratuity/saveupdate")]
        public IActionResult saveUpdateGratuity(GratuitySetupModel gratuity)
        {
            Response response = new Response("/finalsattlement/gratuity/saveupdate");
            try
            {
                if (gratuity.ID == 0)
                {
                    bool result = FinalSattlementDb.saveOrUpdateGratuity(gratuity);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to save";
                    }

                    return Ok(response);
                }
                else
                {
                    bool result = FinalSattlementDb.saveOrUpdateGratuity(gratuity);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Updated Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to update";
                    }

                    return Ok(response);

                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        ///////////////////////////////Gratuity Year setup/////////////////
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/gratuityyear/getall/comp/{companyID}/gradevalue/{gradeValue}/usertypeid/{userTypeID}")]
        public IActionResult getAllGratuityYear(int companyID, int gradeValue,int userTypeID)
        {
            Response response = new Response("/finalsattlement/gratuityyear/getall/comp/" + companyID + "/gradevalue/" + gradeValue+ "/usertypeid/" + userTypeID);
            try
            {
                var result = FinalSattlementDb.getAllGratuityYear(companyID, gradeValue,userTypeID);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/gratuityyear/getallbyId/{id}")]
        public IActionResult getGratuityYearByID(int id)
        {
            Response response = new Response("/finalsattlement/gratuityyear/getallbyId/" + id);
            try
            {
                var result = FinalSattlementDb.getGratuityYearByID(id);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPost]
        [Route( "api/v{version:apiVersion}/finalsattlement/gratuityyear/saveupdate")]
        public IActionResult saveUpdateGratuityYear(GratuityYearModel gratuityyear)
        {
            Response response = new Response("/finalsattlement/gratuityyear/saveupdate");
            try
            {
                if (gratuityyear.ID == 0)
                {
                    bool result = FinalSattlementDb.saveOrUpdateGratuityYear(gratuityyear);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to save";
                    }

                    return Ok(response);
                }
                else
                {
                    bool result = FinalSattlementDb.saveOrUpdateGratuityYear(gratuityyear);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Updated Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to update";
                    }

                    return Ok(response);

                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        /////////////////Final Settlement//////////////////////////
        //[Authorize()]
        //[HttpPost]
        //[Route("api/v{version:apiVersion}/finalsattlement/finalsettlement/caculatefinalsettlement")]
        //public IActionResult CalculateFinalSettlement(FinalSettlementParam fnsettlement)
        //{
        //    Response response = new Response("/finalsattlement/finalsettlement/caculatefinalsettlement");
        //    try
        //    {
        //        var result = FinalSattlementDb.listoffinalsettlement(fnsettlement);
        //        if (result != null)
        //        {
        //            response.Status = true;
        //            response.Result = result;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "No data found";
        //        }

        //        return Ok(response);
        //    }
        //    catch (Exception e)
        //    {
        //        response.Status = false;
        //        response.Result = e.Message;
        //        return Ok(response);
        //    }
        //}

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/finalsattlement/finalsettlement/savefinalsettlement")]
        public IActionResult SaveFinalSettlement(FinalSettlementModel finsettlement)
        {
            Response response = new Response("/finalsattlement/finalsettlement/savefinalsettlement");
            try
            {

                if (finsettlement.ID == 0)
                {
                    bool result = FinalSattlementDb.saveFinalSettlement(finsettlement);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Saved SuccessFully";
                    }


                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to Save!";
                    }

                }
                else
                {
                    bool result = FinalSattlementDb.saveFinalSettlement(finsettlement);
                    if (result)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }


                    else
                    {
                        response.Status = false;
                        response.Result = "Failed to update";
                    }
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        
        // Setu // FinalSettlement
        [HttpGet]
        [Route("api/v{version:apiVersion}/finalsattlement/finalsattlement/gradeValue/{gradeValue}/companyId/{companyId}")]
        public IActionResult GetInactiveEmployee(int gradeValue, int companyId)
        {
            Response response = new Response("/finalsattlement/finalsattlement/gradeValue/" + gradeValue+ "/companyId/"+ companyId);
            try
            {
                var result = FinalSattlementDb.getInactiveEmployee(gradeValue, companyId);
                if (result.Count>0)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }
        //=============================== New Mostafij Add ====================================

        [HttpPost]
        [Route("api/v{version:apiVersion}/finalsattlement/getSeperationEmployee")]
        public IActionResult GetSeperationEmployee(FinalSettlementModel entity)
        {
            Response response = new Response("/finalsattlement/getSeperationEmployee");
            try
            {
                var result = FinalSattlementDb.GetCalculateFinalSattlement(entity);
                if (result != null)
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
            catch (Exception e)
            {
                response.Status = false;
                response.Result = e.Message;
                return Ok(response);
            }
        }

        //[HttpPost]
        //[Route("api/v{version:apiVersion}/finalsattlement/SaveFinalSettlementSalaryInfo")]
        //public IActionResult SaveFinalSettlementSalaryInfo(FinalSettlementModel entity)
        //{
        //    Response response = new Response("/finalsattlement/SaveFinalSettlementSalaryInfo");
        //    var result = FinalSattlementDb.SaveFinalSettlementSalaryInfo(entity);
        //    try
        //    {
        //        if (result)
        //        {
        //            response.Status = true;
        //            response.Result = "Saved SuccessFully";
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "Failed to update.";
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

        //[HttpPost]
        //[Route("api/v{version:apiVersion}/finalsattlement/SaveGratuityTax/utypeid/{userTypeId}")]
        //public  IActionResult SaveGratuityTax(FinalSettlementModel entity,int userTypeId)
        //{
        //    Response response = new Response("/finalsattlement/SaveGratuityTax");
        //    var result = FinalSattlementDb.SaveGratuityTax(entity,userTypeId);
        //    try
        //    {
        //        if (result)
        //        {
        //            response.Status = true;
        //            response.Result = "Saved SuccessFully";
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "Failed to update.";
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

        //GetGratuityAmount

        //[HttpGet]
        //[Route("api/v{version:apiVersion}/finalsattlement/GetGratuityAmount")]
        //public IActionResult GetGratuityAmount()
        //{
        //    var reqParam = HttpContext.Request.Query;
        //    DateTime dt= Convert.ToDateTime(reqParam["date"]);
        //    string empCode = reqParam["empCode"];
        //    int companyId = Convert.ToInt32(reqParam["companyId"]);
        //    int grade = Convert.ToInt32(reqParam["grade"]);
        //    DateTime date=  Convert.ToDateTime(reqParam["date"]);
        //    int empDay = Convert.ToInt32(reqParam["empDay"]);
        //    int comDay = Convert.ToInt32(reqParam["comDay"]);
        //    int calculationType = Convert.ToInt32(reqParam["calculationType"]);
        //    int nodeduct = Convert.ToInt32(reqParam["nodeduct"]);

        //    Response response = new Response("/finalsattlement/GetGratuityAmount");
        //    var result = FinalSattlementDb.GetGratuityAmount(empCode, companyId, grade, date, empDay, comDay, calculationType, nodeduct);
        //    try
        //    {
        //        if (result != null)
        //        {
        //            response.Status = true;
        //            response.Result = result;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "Record Not Found.";
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