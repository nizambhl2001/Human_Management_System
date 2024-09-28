using HRMS.DbContext;
using HRMS.Models.Leave;
using HRMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebApiCore.Models.Leave;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.Leave;

namespace HRMS.Controllers
{
    //[Authorize(Roles = "Admin,SuperAdmin,User,Employee,Manager")]
    [ApiVersion("1")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        //Leave Type
        [HttpPost] [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/type/saveOrUpdate")]
        public IActionResult SaveOrUpdateLeaveType(LeaveTypeModel leaveType)
        {
            Response response = new Response("/leave/type/saveOrUpdate");
            try
            {
                bool isSuccess = Leave.SaveOrUpdateLeaveType(leaveType);
                if (isSuccess)
                {
                    response.Status = true;
                    if (leaveType.ID > 0)
                    {
                        response.Result = "Leave type Updated";
                    }
                    else
                    {
                        response.Result = "New Leave type added successfully!";
                    }
                }
                else
                {
                    response.Status = false;
                    if (leaveType.ID >0)
                    {
                        response.Result = "Failed to update";
                    }
                    else
                    {
                        response.Result = "Failed to add new leave type";
                    }
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


        //[Authorize()]
        //[HttpGet] [ApiVersion("1")]
        //[Route("api/v{version:apiVersion}/leave/type/get/empCode/{empCode}/gender/{gender}")]
        //public IActionResult GetLeaveType(int empCode, int gender)
        //{
        //    Response response = new Response("/leave/type/get/empCode/" + empCode + "/gender/"+gender);
        //    try
        //    {
        //        var types = Leave.GetLeaveType(empCode, gender);
        //        if (types.Count > 0)
        //        {
        //            response.Status = true;
        //            response.Result = types;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = types;
        //        }
        //        return Ok(response);
        //    }catch(Exception err)
        //    {
        //        response.Status = false;
        //        response.Result = err.Message;
        //        return Ok(response);
        //    }
        //}

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/type/get/grade/{grade}/gender/{gender}")]
        public IActionResult GetLeaveType(int grade, int gender)
        {
            Response response = new Response("/leave/type/get/grade/" + grade + "/gender/" + gender);
            try
            {
                var types = Leave.GetLeaveType(grade, gender);
                if (types.Count > 0)
                {
                    response.Status = true;
                    response.Result = types;
                }
                else
                {
                    response.Status = false;
                    response.Result = types;
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

        [HttpDelete] [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/type/delete/id/{id}")]
        public IActionResult DeleteLeaveType(int id)
        {
            Response response = new Response("api/leave/type/delete/id/" + id);
            try
            {
                response.Status = Leave.DeleteLeaveType(id);
                if (response.Status)
                {
                    response.Result = "Leave type Deleted!";
                }
                else{
                    response.Result = "Failed to delete leave type!";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Leave Entry/Apply
        //[Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/status/get")]
        public IActionResult GetLeaveStatus()
        {
            Response response = new Response("/leave/status/get");
            try
            {
                int compId = Convert.ToInt32(HttpContext.Request.Query["companyId"]);
                int grade = Convert.ToInt32(HttpContext.Request.Query["grade"]);
                string empCode = HttpContext.Request.Query["empCode"];
                int periodId = Convert.ToInt32(HttpContext.Request.Query["periodId"]);
                int gender = Convert.ToInt32(HttpContext.Request.Query["gender"]);

                var leaveStatus = Leave.GetLeaveStatus(compId, empCode, periodId);
                if (leaveStatus.Count > 0)
                {
                    response.Status = true;
                    response.Result = leaveStatus;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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
        [Route("api/v{version:apiVersion}/leave/applyInfo/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetLeaveInfo(int compId, string empCode)
        {
            Response response = new Response("/leave/applyInfo/get/compId/"+compId+"/empCode/"+empCode);
            try
            {
                var leaveInfo = Leave.GetLeaveInfo(compId, empCode);
                if (leaveInfo.Count > 0)
                {
                    response.Status = true;
                    response.Result = leaveInfo;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/apply/get/compId/{compId}/date/{date}")]
        public IActionResult GetLeaveInfoByUser(int compId, string date)
        {
            Response response = new Response("/leave/applyInfo/get/compId/" + compId + "/date/" + date);
            try
            {
                var leaveInfo = Leave.GetLeaveInfoByUser(compId, date);
                if (leaveInfo.Count > 0)
                {
                    response.Status = true;
                    response.Result = leaveInfo;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/apply")]
        public IActionResult Apply(LeaveApplyModel leaveApply)
        {
            Response response = new Response("api/leave/apply");
            try
            {
                bool isSuccess = Leave.Apply(leaveApply);
                if (isSuccess)
                {
                    response.Status = true;
                    response.Result = "Leave application sent successfully!";
                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to sent leave application successfully!";
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leaveinfo/id/{id}")]
        public IActionResult GetLeaveApplication(int id)
        {
            Response response = new Response("/leaveinfo/id/"+id);
            try
            {
                var application = Leave.GetLeaveApplication(id);
                if (application != null)
                {
                    response.Status = true;
                    response.Result = application;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Manual Leave Entry

        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/apply/manual")]
        public IActionResult ManualEntry(List<LeaveApplyModel> manualLeave)
        {
            Response response = new Response("/leave/entry/manual");
            bool isSuccess = Leave.ManualEntry(manualLeave);
            if (isSuccess)
            {
                response.Status = true;
                response.Result = "Saved Successfully!";
                return Ok(response);
            }
            else
            {
                response.Status = false;
                response.Result = "Failed to manual setup!";
                return Ok(response);
            }
        }

        //Update Leave Entry
        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leaveEntry/get")]
        public IActionResult GetLeaveEntryForUpdate()
        {
            var reqParam = HttpContext.Request.Query;
            int compId = Convert.ToInt32(reqParam["CompanyId"]);
            int gradeValue = Convert.ToInt32(reqParam["GradeValue"]);
            string empCode = reqParam["EmpCode"];
            var startDate = Convert.ToDateTime((reqParam["StartDate"]));
            var endDate = Convert.ToDateTime(reqParam["EndDate"]);
            Response response = new Response("/leaveEntry/get");
            try
            {
                var applications = Leave.GetLeaveInfoForUpdate(compId, gradeValue,empCode, startDate, endDate);
                if (applications.Count > 0)
                {
                    response.Status = true;
                    response.Result = applications;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found!";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
            
        }
        [Authorize()]
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/entry/update")]
        public IActionResult UpdateLeaveInfo(List<LeaveApplyModel> leaveInfoList)
        {
            Response response = new Response("/leave/entry/update");
            try
            {
                bool isSuccess = Leave.UpdateLeaveInfo(leaveInfoList);
                if (isSuccess)
                {
                    response.Status = true;
                    response.Result = "Updated successfully!";
                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to update";
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
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/entry/updateByAuthority")]
        public IActionResult UpdatebyAuthority(LeaveApplyModel leaveApply)
        {
            Response response = new Response("/leave/entry/updatebyAuthority");
            try
            {
                response.Status = Leave.UpdateByAuthority(leaveApply);
                if (response.Status)
                {
                    response.Result = "Leave Application Updated!";
                }
                else
                {
                    response.Result = "Failed to Update!";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //Leave Recommend
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/recommend/compId/{compId}/year/{year}/empCode/{empCode}")]
        public IActionResult GetWaitingLeaveForRecommend(int compId, string year, string empCode)
        {
            Response response = new Response($"/leave/recommend/compId/{compId}/year/{year}/empCode/{empCode}");
            try
            {
                var applications = Leave.GetWaitingLeaveForRecommend(compId, year, empCode);
                if (applications.Count > 0)
                {
                    response.Status = true;
                    response.Result = applications;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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

        //Leave Approval
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/approval/compId/{compId}/year/{year}/empCode/{empCode}")]
        public IActionResult GetWaitingLeaveForApprove(int compId, string year, string empCode)
        {
            Response response = new Response($"/leave/approval/compId/{compId}/year/{year}/empCode/{empCode}");
            try
            {
                var applications = Leave.GetWaitingLeaveForApprove(compId, year, empCode);
                if (applications.Count > 0)
                {
                    response.Status = true;
                    response.Result = applications;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/leave-info-status/update")]
        public IActionResult UpdateLeaveInfoStatus(LeaveInfoStatusModel lis)
        {
            Response response = new Response("/leave/leave-info-status/update");
            try
            {
                response.Status = Leave.UpdateLeaveInfoStatus(lis);
                if (response.Status)
                {
                    response.Result = "Updated Successfully!";
                }
                else
                {
                    response.Result = "Failed to Update leave info status!";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/details/status/get/")]
        public IActionResult LeaveStatus()
        {
            Response response = new Response("/leave/details/status/get/");
            var param = HttpContext.Request.Query;
            LeaveInfoStatusModel leave = new LeaveInfoStatusModel()
            {
                Type = Convert.ToInt32(param["Type"]),
                LeaveID = Convert.ToInt32(param["LeaveID"]),
                COmpanyID = Convert.ToInt32(param["CompanyID"]),
                ReqFrom = param["ReqFrom"],
                ReqTo = param["ReqTo"],
                Remarks=param["Remarks"],
            };
            try
            {
                var result = Leave.getLeaveStaus(leave);
                if (result.Count > 0)
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
            }
            return Ok(response);
        }

        //Approve by HR
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/approveByHr/get/compId/{compId}")]
        public IActionResult GetLeaveInfoForHrApprove(int compId, int year)
        {
            Response response = new Response($"/leave/approveByHr/get/compId/{compId}");
            try
            {
                var applications = Leave.GetLeaveInfoForHrApprove(compId);
                if (applications.Count > 0)
                {
                    response.Status = true;
                    response.Result = applications;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //[HttpGet]
        //[ApiVersion("1")]
        //[Route("api/v{version:apiVersion}/leave/approveByHr/get/compId/{compId}/year/{year}")]
        //public IActionResult GetLeaveInfoForHrApprove(int compId, int year)
        //{
        //    Response response = new Response($"/leave/approveByHr/get/compId/{compId}/year/{year}");
        //    try
        //    {
        //        var applications = Leave.GetLeaveInfoForHrApprove(compId, year);
        //        if (applications.Count > 0)
        //        {
        //            response.Status = true;
        //            response.Result = applications;
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Result = "No data found";
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
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/approveByHr/approve")]
        public IActionResult ApproveByHr(LeaveDetailsViewModel ldvm)
        {
            Response response = new Response("/leave/approveByHr/approve");
            try
            {
                response.Status = Leave.ApproveByHr(ldvm);
                if (response.Status)
                {
                    response.Result = "Application Approve Successfully!";
                }
                else
                {
                    response.Result = "Failed to Approve!";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/approveByHr/cancel/leaveId/{leaveId}")]
        public IActionResult CancelByHr(int leaveId)
        {
            Response response = new Response($"/leave/approveByHr/cancel/leaveId/{leaveId}");
            try
            {
                response.Status = Leave.CancelByHr(leaveId);
                if (response.Status)
                {
                    response.Result = "Leave Application Canceled!";
                }
                else
                {
                    response.Result = "Failed to Cancel Application!";
                }
                return Ok(response);
            }
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/approveByHr/updateAndApprove")]
        public IActionResult UpdateAndApproveByHr(LeaveApplyModel la)
        {
            Response response = new Response("/leave/approveByHr/updateAndApprove");
            try
            {
                response.Status = Leave.UpdateAndApproveByHr(la);
                if (response.Status)
                {
                    response.Result = "Update and Approved Successfully!";
                }
                else
                {
                    response.Result = "Failed to Update and Approve!";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        
        //Opening Balance
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/getEarnLeaveBalance")]
        public IActionResult GetEarnLeaveBalance(EarnLeaveBalanceViewModel filterModel)
        {
            Response response = new Response("/leave/getEarnLeaveBalance");
            try
            {
                var items = Leave.GetEarnLeaveBalance(filterModel);
                if (items.Count > 0)
                {
                    response.Status = true;
                    response.Result = items;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/openingBalence/save")]
        public IActionResult OpeningBalenceSave(EarnLeaveBalanceModel leaveBalence)
        {
            Response response = new Response("/leave/openingBalance");
            try
            {
                response.Status = Leave.OpeningBalenceSave(leaveBalence);
                if (response.Status)
                {
                    response.Result = "Leave Opening Balence Inserted";
                }
                else
                {
                    response.Result = "Failed to Insert leave opening balence";
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

        //Carry Forward And Encashment
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/carryForwardOrEncashment/get")]
        public IActionResult GetCarryForwardOrEncashment(EarnLeaveBalanceViewModel filterModel)
        {
            Response response = new Response("/leave/carryForwardOrEncashment/get");
            try
            {
                var items = Leave.GetCarryForwardOrEncashment(filterModel);
                if (items.Count > 0)
                {
                    response.Status = true;
                    response.Result = items;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/carryForward/save")]
        public IActionResult SaveOrUpdateCarryForward(EarnLeaveBalanceModel leaveBalance)
        {
            Response response = new Response("/leave/carryForward/savee");
            try
            {
                response.Status = Leave.CarryForwardInsertOrUpdate(leaveBalance);
                if (response.Status)
                {
                    response.Result = "Carry Forwarded Successfully!";
                }
                else
                {
                    response.Result = "Failed to Carry Forward";
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
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/encashment/save")]
        public IActionResult SaveOrUpdateEncashment(EarnLeaveBalanceModel leaveBalance)
        {
            Response response = new Response("/leave/encashment/save");
            try
            {
                response.Status = Leave.SaveOrUpdateEncashment(leaveBalance);
                if (response.Status)
                {
                    response.Result = "Encashment Inserted Successfully!";
                }
                else
                {
                    response.Result = "Failed to Insert Encashment!";
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

        //Substitute Leave
        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/substituteLeave/get")]
        public IActionResult GetSubstituteLeave(EarnLeaveBalanceViewModel filterModel)
        {
            Response response = new Response("/leave/substituteLeave/get");
            try
            {
                var items = Leave.GetSubstituteLeave(filterModel);
                if (items.Count > 0)
                {
                    response.Status = true;
                    response.Result = items;
                }
                else
                {
                    response.Status = false;
                    response.Result = "No data found";
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

        [HttpPost]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/leave/substituteLeave/save")]
        public IActionResult SaveOrUpdateSubstituteLeave(EarnLeaveBalanceModel leaveBalence)
        {
            Response response = new Response("/leave/substituteLeave/save");
            try
            {
                response.Status = Leave.SaveOrUpdateSubstituteLeave(leaveBalence);
                if (response.Status)
                {
                    response.Result = "Substitute Leave inserted successfully!";
                }
                else
                {
                    response.Result = "Failed to insert Substitute Leave";
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
        [Route("api/v{version:ApiVersion}/leave/get/leaveInfoStatus/")]
        public IActionResult getLeaveStatus()
        {
            Response response = new Response("/leave/get/leaveInfoStatus/");
            try
            {
                string empCode = HttpContext.Request.Query["empCode"];
                int CompanyID = Convert.ToInt32(HttpContext.Request.Query["companyID"]);
                var result = Leave.getLeaveInfoStatus(empCode,CompanyID);
                if (result.Count > 0)
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


        [HttpDelete]
        [ApiVersion("1")]
        [Route("api/v{version:ApiVersion}/leave/delete/id/{id}")]

        public IActionResult delete(int id)
        {
            Response response = new Response("leave/delete/id/{id}");

            try
            {
                response.Status = Leave.DeleteById(id);
                if (response.Status)
                {
                    return Ok(new { status = true, message = "Delete Successfully" });
                }
                else
                {
                    return Ok(new { status = false, message = "Something is Wrong" });
                }

            }
            catch(Exception error)
            {
                return BadRequest(error.Message);

            }
        }


    }
}
