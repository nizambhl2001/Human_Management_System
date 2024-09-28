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
    public class UndoSalaryProcessController : ControllerBase
    {
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/undosalaryprocess/undosalary")]
        public IActionResult UndoSalary(UndoSalaryProcessModel undoSalaryProcess)
        {
             Response response = new Response("/undosalaryprocess/undosalary");
            try
            {
                var result = UndoSalaryProcess.ChaqueSalarylOCK(undoSalaryProcess);
                if (result.Count > 0)
                {
                    response.Status = true;
                    response.Result = "This month Salary Already Locked";
                }
                else
                {
                    response.Status = UndoSalaryProcess.GetSalaryUndoInfo(undoSalaryProcess);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Salary Undo Sussesfuly ";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "You can not Undo  This month Salary ";
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
        
    }
}