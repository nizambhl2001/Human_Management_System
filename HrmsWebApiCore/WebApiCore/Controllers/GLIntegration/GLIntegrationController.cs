
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.GL_Integration;
using WebApiCore.Models.GL_Integration;
using WebApiCore.ViewModels;

namespace WebApiCore.Controllers.GLIntegration
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class GLIntegrationController : ControllerBase
    {

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/costhead/saveorupdate/{option}")]
        public IActionResult saveOrUpdateCostHead(CostHeadModel costHead,int option)
        {
            Response response=new Response("/glintegration/costhead/saveorupdate/"+option);
            try
            {
                if (option == 1)
                {
                    if (costHead.ID == 0)
                    {
                        var result = GLIntegrationDB.saveOrUpdateCostHead(costHead, option);
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
                    }
                    else
                    {
                        var result = GLIntegrationDB.saveOrUpdateCostHead(costHead, option);
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

      
        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/costhead/getallcosthead/{option}")]
        public IActionResult getAllCostHead(CostHeadModel costhead,int option)
        {
            Response response=new Response("/glintegration/costhead/getallcosthead/"+option);
            try
            {
                if (option == 2)
                {
                    var result = GLIntegrationDB.getAllCostHead(costhead, option);
                    if (result.Count > 0)
                    {
                        response.Status = true;
                        response.Result = result;
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Data not Found";
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

        /////////////////////GLCode setup//////////////////////
        [Authorize()]

        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/glcode/saveorupdate/{option}")]
        public IActionResult saveOrUpdateGLCode(GLCodeModel glcode, int option)
        {
            Response response = new Response("/glintegration/glcode/saveorupdate/" + option);
            try
            {
                if (option == 1)
                {
                    if (glcode.ID == 0)
                    {
                        var result = GLIntegrationDB.saveOrUpdateGLCode(glcode, option);
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
                    }
                    else
                    {
                        var result = GLIntegrationDB.saveOrUpdateGLCode(glcode, option);
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

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/glcode/getallcosthead/{option}")]
        public IActionResult getAllGLCode(GLCodeModel glcode, int option)
        {
            Response response = new Response("/glintegration/glcode/getallcosthead/" + option);
            try
            {
                if (option == 2)
                {
                    var result = GLIntegrationDB.getAllGLCode(glcode, option);
                    if (result.Count > 0)
                    {
                        response.Status = true;
                        response.Result = result;
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Data not Found";
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

        [Authorize()]
        [HttpGet]
            [Route("api/v{version:apiVersion}/glintegration/glcode/getallcostheadfordropdown")]
        public IActionResult getAllCostHeadforDropDown()
        {
           Response response=new Response("/glintegration/glcode/getallcostheadfordropdown");
           try
           {
               var result = GLIntegrationDB.getAllCostHeadForDropDown();
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
           catch (Exception err)
           {
               response.Status = false;
               response.Result = err.Message;
               return Ok(response);
           }
        }
        ////////////////GL SalaryHead Assign///////////////


        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/glsalheadassign/saveorupdate/{option}")]
        public IActionResult saveOrUpdateGLSalaryHeadAssign(GLSalaryHeadAssignModel glsalheadassign, int option)
        {
            Response response = new Response("/glintegration/glsalheadassign/saveorupdate/" + option);
            try
            {
                if (option == 1)
                {
                    if (glsalheadassign.ID == 0)
                    {
                        var result = GLIntegrationDB.saveOrUpdateGLSalaryHeadAssign(glsalheadassign, option);
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
                    }
                    else
                    {
                        var result = GLIntegrationDB.saveOrUpdateGLSalaryHeadAssign(glsalheadassign, option);
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

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/glintegration/glsalheadassign/getallsalheadassgn/{option}")]
        public IActionResult getAllGLSalaryHeadAssign(GLSalaryHeadAssignModel glsalaryheadassign, int option)
        {
            Response response = new Response("/glintegration/glsalheadassign/getallsalheadassgn/" + option);
            try
            {
                if (option == 2)
                {
                    var result = GLIntegrationDB.getAllGLSalaryHeadAssign(glsalaryheadassign, option);
                    if (result.Count > 0)
                    {
                        response.Status = true;
                        response.Result = result;
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Data not Found";
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