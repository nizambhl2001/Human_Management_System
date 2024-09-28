using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Models;
using HRMS.Models.ShiftAllowance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.ShiftAllowance;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.ShiftAllowance
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class EditShiftAllowanceController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/shiftallowance/editshiftallowance/getall")]
        public IActionResult GetAll(FilterModel filterModel)
        {
            Response response = new Response("/shiftallowance/editshiftallowance/getall");
            try
            {
                var result = EditShiftAllowanceDb.GetAllEditShiftAllowance(filterModel);
                if (result.Count > 0)
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }

        }
        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/shiftallowance/editshiftallowance/delete/{id}")]
        public IActionResult Delete(int id)
        {
            Response response = new Response("/shiftallowance/editshiftallowance/delete/" + id);
            try
            {
                response.Status = EditShiftAllowanceDb.Delete(id);
                if (response.Status)
                {
                    response.Result = "Deleted successfully";
                }
                else
                {
                    response.Result = "Failed to deleted";
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
        [HttpPut]
        [Route("api/v{version:apiVersion}/shiftallowance/editshiftallowance/update")]
        public IActionResult Update(AssignShiftAllowanceModel editshift)
        {
            Response response = new Response("/shiftallowance/editshiftallowance//update");
            try
            {
                response.Status = EditShiftAllowanceDb.UpdateEditAllowance(editshift);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Updated successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed to update";
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



    }
}