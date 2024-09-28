using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.Models.SalarySetup;
using WebApiCore.Models.SystemSetup;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.SystemSetup;

namespace WebApiCore.Controllers.SystemSetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class SystemSetupController : ControllerBase
    {
        //=========================================== Academic  Dicipline==============================================

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/systemsetup/academicdis/getall")]
        public IActionResult GetAllAcademicList()
        {
            Response response = new Response("/systemsetup/academicdis/getall");
            var result = AcademicDicipline.getAcademicList();
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
        [Route("api/v{version:apiVersion}/systemsetup/academicdis/getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            Response response = new Response("/systemsetup/academicdis/getbyid/{id}");
            var result = AcademicDicipline.getByid(id);
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
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/systemsetup/academicdis/saveorupdate")]
        public IActionResult SaveOrUpdate(BasicEntryModel entryModel)
        {
            Response response = new Response("/systemsetup/academicdis/saveorupdate");

            try
            {
                if (entryModel.ID == 0)
                {
                    response.Status = AcademicDicipline.saveAcademicDis(entryModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = AcademicDicipline.updateAcademicDis(entryModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/systemsetup/academicdis/delete/{id}")]
        public IActionResult DeleteAcademicDis(int id)
        {
            Response response = new Response("/systemsetup/academicdis/delete/{id}");

            try
            {
                response.Status = AcademicDicipline.deleteAcademicDis(id);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Delete Succesfully";
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

        //============================================= Assaign DepartmentGL ================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/systemsetup/assaigndepartmentgl/getlist/{comid}")]
        public IActionResult GetDepartmentAssaignList(int comid)
        {
            Response response = new Response("/systemsetup/assaigndepartmentgl/getlist/{comid}");
            try
            {
                var result = AssaignDepartmentGL.getAssignGL(comid);
                if (result.Count > 0)
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
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }
        [Authorize()]
        [HttpPut]
        [Route("api/v{version:apiVersion}/systemsetup/assaigndepartmentgl/assign")]
        public IActionResult AssaignDepartment(AssaignDepartmentGLViewModel glModel)
        {
            Response response = new Response("/systemsetup/assaigndepartmentgl/assign");
            try
            {
                response.Status = AssaignDepartmentGL.assaignDepartmentGL(glModel);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Assaign Successfull";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Assaign";
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


        //=================================================Bank Branch =================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/systemsetup/bankbranch/get/comid/{comid}/bankid/{bankid}")]
        public IActionResult GetAllBankBranch(int comid, int bankid)
        {
            Response response = new Response("/salaryprocess/payscalelist/get");
            var result = BankBranch.getBankBranchList(comid, bankid);
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
        [Route("api/v{version:apiVersion}/systemsetup/bankbranch/getbyid/{id}")]
        public IActionResult GetByIdBankBranch(int id)
        {
            Response response = new Response("/systemsetup/bankbranch/getbyid/{id}");
            var result = BankBranch.getByid(id);
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
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/systemsetup/bankbranch/savebankbranch")]
        public IActionResult SaveOrUpdate(BankBranchModel branchModel)
        {
            Response response = new Response("/systemsetup/bankbranch/savebankbranch");

            try
            {
                if (branchModel.ID == 0)
                {
                    response.Status = BankBranch.saveBankBranch(branchModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = BankBranch.updateBankBranch(branchModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/systemsetup/bankbranch/delete/{id}")]
        public IActionResult DeleteBankBranch(int id)
        {
            Response response = new Response("/systemsetup/bankbranch/delete");

            try
            {
                response.Status = BankBranch.deleteBankBranck(id);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Delete Succesfully";
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

        //========================================== Division =============================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/systemsetup/division/getall")]
        public IActionResult GetAllDivision()
        {
            Response response = new Response("/systemsetup/division/getall");
            var result = DivisionContext.getDivisionList();
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
        [Route("api/v{version:apiVersion}/systemsetup/division/getbyid/{id}")]
        public IActionResult GetByIdDivision(int id)
        {
            Response response = new Response("/systemsetup/division/getbyid/{id}");
            var result = DivisionContext.getByid(id);
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
                    response.Result = "Data Not Found";
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
        [Route("api/v{version:apiVersion}/systemsetup/division/saveorupdate")]
        public IActionResult SaveOrUpdate(DivisionModel divisionModel)
        {
            Response response = new Response("/systemsetup/division/saveorupdate");

            try
            {
                if (divisionModel.DivisionID == 0)
                {
                    response.Status = DivisionContext.saveDivision(divisionModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = DivisionContext.updateDivision(divisionModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/systemsetup/division/delete/{id}")]
        public IActionResult DeleteDivision(int id)
        {
            Response response = new Response("/systemsetup/division/delete");

            try
            {
                response.Status = DivisionContext.deleteDivision(id);
                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Delete Succesfully";
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

        //====================================== HolyDay Calender =============================================================
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/holyday/count/fromDate/{fromDate}/toDate/{toDate}/grade/{grade}")]
        public IActionResult GetNumOfHolyday(string fromDate, string toDate, int grade)
        {
            Response response = new Response("/setup/holyday/count/fromDate/" + fromDate + "/toDate/" + toDate + "/grade/" + grade);
            try
            {
                response.Result = Holyday.GetNumOfHolyday(fromDate, toDate, grade);
                response.Status = true;
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
        [Route("api/v{version:apiVersion}/systemsetup/holyday/getholydaylist/yearmonth/")]
        public IActionResult GetHolydayList()
        {
            Response response = new Response("/systemsetup/holyday/getholydaylist/");
            try
            {
                var reqParam = HttpContext.Request.Query;
                DateTime yearMonth = Convert.ToDateTime(reqParam["yearMonth"]);

                var result = Holyday.getHolydayList(yearMonth);
                if (result.Count > 0)
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
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/systemsetup/holyday/saveholyday")]
        public IActionResult SaveHolyDay(HolydayModel holydayModel)
        {
            Response response = new Response("/systemsetup/holyday/saveholyday");
            try
            {
                response.Status = Holyday.saveHolyday(holydayModel);

                if (response.Status)
                {
                    response.Status = true;
                    response.Result = "Update Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Failed To Update";
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
        //========================================================== Production Unit ====================================================
        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/systemsetup/productionunit/saveorupdate")]
        public IActionResult SaveHolyDay(BasicEntryModel basicEntryModel)
        {
            Response response = new Response("/systemsetup/productionunit/saveorupdate");
            try
            {
                if (basicEntryModel.ID == 0) {
                    response.Status = ProductionUnite.saveOrUpdateProUnit(basicEntryModel);

                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = ProductionUnite.saveOrUpdateProUnit(basicEntryModel);

                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/systemsetup/productionunit/getbyid/{id}")]
        public IActionResult GetByIDProductionUnit(int id)
        {
            Response response = new Response("/systemsetup/productionunit/getbyid/{id}");
            try
            {
                var result = ProductionUnite.getByIdProductionUnit(id);
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
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        //====================================================== Flore Controller ========================================================================


        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/setup/flore/get")]
        public IActionResult GetOccupation()
        {
            Response response = new Response("/setup/setup/flore/get");
            var occupation = Flore.GetFlore();
            try
            {
                if (occupation.Count > 0)
                {
                    response.Status = true;
                    response.Result = occupation;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/setup/flore/get/by/ProductionId/id/{id}")]
        public IActionResult getFloreBypPoductionId(int id)
        {
            Response response = new Response("/setup/setup/flore/get/by/ProductionId/id/" + id);
            var flore = Flore.getFloreByID(id);
            try
            {
                if (flore.Count > 0)
                {
                    response.Status = true;
                    response.Result = flore;
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
        [Route("api/v{version:apiVersion}/systemsetup/flore/saveorupdate")]
        public IActionResult SaveOrUpdateFlore(FloreModel floreModel)
        {
            Response response = new Response("/systemsetup/flore/saveorupdate");
            try
            {
                if (floreModel.ID == 0)
                {
                    response.Status = Flore.saveOrUpdateFlore(floreModel);

                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = Flore.saveOrUpdateFlore(floreModel);

                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [Route("api/v{version:apiVersion}/setup/setup/flore/get/by/id/{id}")]
        public IActionResult GetFloreByFloreId(int id)
        {
            Response response = new Response("/setup/setup/flore/get/by/id/" + id);
            var flore = Flore.getByFloreId(id);
            try
            {
                if (flore!=null)
                {
                    response.Status = true;
                    response.Result = flore;
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


        //============================================================= Production Line ============================================================

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/line/get/by/floreId/id/{id}")]
        public IActionResult getLineByFloreId(int id)
        {
            Response response = new Response("/setup/line/get/by/floreId/id/" + id);
            var line = Line.getLineByFloreId(id);
            try
            {
                if (line.Count > 0)
                {
                    response.Status = true;
                    response.Result = line;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/line/getflorelist/unitid/{unitid}/comid/{comid}")]
        public IActionResult GetFloreList(int unitid,int comid)
        {
            Response response = new Response("/setup/line/getflorelist/unitid/{id}/comid/{comid}");
            var line = Line.getFloreList(unitid, comid);
            try
            {
                if (line.Count > 0)
                {
                    response.Status = true;
                    response.Result = line;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/line/getlinelist/floreid/{floreid}/comid/{comid}")]
        public IActionResult GetLineList(int floreid, int comid)
        {
            Response response = new Response("/setup/line/getlinelist/floreid/{floreid}/comid/{comid}");
            var line = Line.getProductionLineList(floreid, comid);
            try
            {
                if (line.Count > 0)
                {
                    response.Status = true;
                    response.Result = line;
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

        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/line/getlinebyid/id/{id}")]
        public IActionResult GetLineList(int id)
        {
            Response response = new Response("/setup/line/getlinebyid/id/{id}");
            var line = Line.getByIdProductionLine(id);
            try
            {
                if (line!=null)
                {
                    response.Status = true;
                    response.Result = line;
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
        [Route("api/v{version:apiVersion}/systemsetup/productionline/saveorupdate")]
        public IActionResult SaveOrUpdateProductionLine(LineModel lineModel)
        {
            Response response = new Response("/systemsetup/productionline/saveorupdate");

            try
            {
                if (lineModel.ID == 0)
                {
                    response.Status = Line.saveOrUpdateProductionLine(lineModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = Line.saveOrUpdateProductionLine(lineModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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

        //====================================================== Production Machine ================================================================

        [Authorize()]
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/machine/get/by/line/id/{id}")]
        public IActionResult getMachineBypLineId(int id)
        {
            Response response = new Response("/setup/machine/get/by/line/id/" + id);
            var machine = MachineData.getMachineByLineID(id);
            try
            {
                if (machine.Count > 0)
                {
                    response.Status = true;
                    response.Result = machine;
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/setup/productionmachine/getall/lineid/{lineid}/comid/{comid}")]
        public IActionResult GetProductionMachineListByLineId(int lineid,int comid)
        {
            Response response = new Response("/setup/setup/productionmachine/getall/lineid/{lineid}/comid/{comid}");
            var result = MachineData.getProductionMachineList(lineid,comid);
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
        [Route("api/v{version:apiVersion}/systemsetup/productionmachine/saveorupdate")]
        public IActionResult SaveOrUpdateProductionMachine(MachineModel machineModel)
        {
            Response response = new Response("/systemsetup/productionmachine/saveorupdate");

            try
            {
                if (machineModel.ID == 0)
                {
                    response.Status = MachineData.saveOrUpdateProductionMachine(machineModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Save Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Save";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = MachineData.saveOrUpdateProductionMachine(machineModel);
                    if (response.Status)
                    {
                        response.Status = true;
                        response.Result = "Update Successfully";
                    }
                    else
                    {
                        response.Status = false;
                        response.Result = "Failed To Update";
                    }
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
        [HttpGet]
        [ApiVersion("1")]
        [Route("api/v{version:apiVersion}/setup/machine/getmachinebyid/id/{id}")]
        public IActionResult GetMachineById(int id)
        {
            Response response = new Response("/setup/machine/getmachinebyid/id/{id}");
            var line = MachineData.getByIdProductionMachineById(id);
            try
            {
                if (line != null)
                {
                    response.Status = true;
                    response.Result = line;
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


    }
}