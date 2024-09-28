using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCore.DbContext.SystemSetup;
using WebApiCore.Models.SystemSetup;
using WebApiCore.ViewModels;

namespace WebApiCore.DbContext.SystemSetup
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class BasicEntryController : ControllerBase
    {
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/get/tableName/{tableName}/compId/{compId}")]
        public IActionResult GetBasicItems(string tableName, int compId)
        {
            Response response = new Response("/setup/basic/get");
            var result = BasicEntry.GetAllBasicItems(tableName, compId);
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
        [Route("api/v{version:apiVersion}/setup/basic/saveupdatebasicentry")]
        public IActionResult SaveOrUpdateBasicEntry(BasicEntryModel basicEntryModel)
        {
         
            Response response = new Response("/setup/basic/saveupdatebasicentry");

            try
            {
                if (basicEntryModel.ID == 0)
                {
                    response.Status = BasicEntry.SaveBasicEntry(basicEntryModel);
                    if (response.Status)
                    {

                        response.Result = "Data Save Successfully";
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
                    response.Status = BasicEntry.UpdateBasicEntry(basicEntryModel);
                    if (response.Status)
                    {

                        response.Result = "Data Update Successfully";
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
        [Route("api/v{version:apiVersion}/setup/basic/tableName/{tableName}/id/{id}/compID/{companyID}")]
        public IActionResult DeleteBasicEntry(string tableName,int id, int companyID)
        {
            Response response = new Response("/setup/basic/tableName/"+tableName+ "/id/"+id+ "/compID/"+companyID);
            try
            {
              response.Status = BasicEntry.DeleteBasicEntry(tableName, id,companyID);
                if (response.Status)
                {
                   
                    response.Result = "Deleted";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail";
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
        [Route("api/v{version:apiVersion}/setup/basic/getbyidbasicentry")]
        public IActionResult GetByIdBasicEntry(BasicEntryModel basicEntryModel)
        {
            Response response = new Response("/setup/basic/getbyidbasicentry");
           
            try
            {
                var result = BasicEntry.GetByIdBasicEntry(basicEntryModel);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }


        ///////////////////////////////////////////////////////////////////////////////


        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/bank/get")]
        public IActionResult GetBank()
        {
            Response response = new Response("/setup/basic/bank/get");
            var result = BasicEntry.GetBank();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/bank/getbankbranch")]
        public IActionResult GetBankBranch()
        {
            Response response = new Response("/setup/basic/bank/getbankbranch");
            var result = BasicEntry.GetBankBranch();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/designation/get")]
        public IActionResult GetDesignation()
        {
            Response response = new Response("/setup/basic/designation/get");
            var result = BasicEntry.GetDesignation();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/department/get")]
        public IActionResult GetDepartment()
        {
            Response response = new Response("/setup/basic/department/get");
            var result = BasicEntry.GetDepartment();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/departmentgl/get")]
        public IActionResult GetDepartmentGL()
        {
            Response response = new Response("/setup/basic/departmentgl/get");
            var result = BasicEntry.GetDepartmentGL();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/location/get")]
        public IActionResult GetLocation()
        {
            Response response = new Response("/setup/basic/location/get");
            var districts = BasicEntry.GetLocation();
            try
            {
                if (districts.Count > 0)
                {
                    response.Status = true;
                    response.Result = districts;
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
        [Route("api/v{version:apiVersion}/setup/basic/country/get")]
        public IActionResult GetCountry()
        {
            Response response = new Response("/setup/basic/country/get");
            var countries = BasicEntry.GetCountry();
            try
            {
                if (countries.Count > 0)
                {
                    response.Status = true;
                    response.Result = countries;
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
        [Route("api/v{version:apiVersion}/setup/basic/division/get")]
        public IActionResult GetDivision()
        {
            Response response = new Response("/setup/basic/division/get");
            var division = BasicEntry.GetDivisions();
            try
            {
                if (division.Count > 0)
                {
                    response.Status = true;
                    response.Result = division;
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
        [Route("api/v{version:apiVersion}/setup/basic/district/get/divisionId/{divisionId}")]
        public IActionResult GetDistrict(int divisionId)
        {
            Response response = new Response("/setup/basic/district/get/divisionId/" + divisionId);
            var districts = BasicEntry.GetDistricts(divisionId);
            try
            {
                if (districts.Count > 0)
                {
                    response.Status = true;
                    response.Result = districts;
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
        [Route("api/v{version:apiVersion}/setup/basic/upazila/get/districtId/{districtId}")]
        public IActionResult GetUpazila(int districtId)
        {
            Response response = new Response("/setup/basic/upazila/get/districtId/" + districtId);
            var upazila = BasicEntry.GetUpazila(districtId);
            try
            {
                if (upazila.Count > 0)
                {
                    response.Status = true;
                    response.Result = upazila;
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
        [Route("api/v{version:apiVersion}/setup/basic/thana/get/upazilaId/{upazilaId}")]
        public IActionResult GetThana(int upazilaId)
        {
            Response response = new Response("/setup/basic/thana/get/upazilaId/" + upazilaId);
            var upazila = BasicEntry.GetThana(upazilaId);
            try
            {
                if (upazila.Count > 0)
                {
                    response.Status = true;
                    response.Result = upazila;
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
        [Route("api/v{version:apiVersion}/setup/basic/nationality/get")]
        public IActionResult GetNationality()
        {
            Response response = new Response("/setup/basic/nationality/get");
            var nationality = BasicEntry.GetNationality();
            try
            {
                if (nationality.Count > 0)
                {
                    response.Status = true;
                    response.Result = nationality;
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
        [Route("api/v{version:apiVersion}/setup/basic/gender/get")]
        public IActionResult GetGender()
        {
            Response response = new Response("/setup/basic/gender/get");
            var gender = BasicEntry.GetGender();
            try
            {
                if (gender.Count > 0)
                {
                    response.Status = true;
                    response.Result = gender;
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
        [Route("api/v{version:apiVersion}/setup/basic/religion/get")]
        public IActionResult GetReligion()
        {
            Response response = new Response("/setup/basic/religion/get");
            var religion = BasicEntry.GetReligion();
            try
            {
                if (religion.Count > 0)
                {
                    response.Status = true;
                    response.Result = religion;
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
        [Route("api/v{version:apiVersion}/setup/basic/blood/get")]
        public IActionResult GetBloodGroup()
        {
            Response response = new Response("/setup/basic/blood/get");
            var blood = BasicEntry.GetBloodGroup();
            try
            {
                if (blood.Count > 0)
                {
                    response.Status = true;
                    response.Result = blood;
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
        [Route("api/v{version:apiVersion}/setup/basic/educationLevel/get")]
        public IActionResult GetEducationLevel()
        {
            Response response = new Response("/setup/basic/educationLevel/get");
            var result = BasicEntry.GetEducationLevel();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/educationGroup/get")]
        public IActionResult GetEducationGroup()
        {
            Response response = new Response("/setup/basic/educationGroup/get");
            var result = BasicEntry.GetEducationGroup();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/edu/board/get")]
        public IActionResult GetEducationBoard()
        {
            Response response = new Response("/setup/basic/edu/board/get");
            var result = BasicEntry.GetEducationBoard();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/institute/get")]
        public IActionResult GetInstitute()
        {
            Response response = new Response("/setup/basic/institute/get");
            var result = BasicEntry.GetInstitute();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/result/get")]
        public IActionResult GetResult()
        {
            Response response = new Response("/setup/basic/result/get");
            var result = BasicEntry.GetResult();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/passingYears/get")]
        public IActionResult GetPassingYears()
        {
            Response response = new Response("/setup/basic/passingYears/get");
            var result = BasicEntry.GetPassingYear();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/training/type/get")]
        public IActionResult GetTrainingType()
        {
            Response response = new Response("/setup/basic/training/type/get");
            var result = BasicEntry.GetTrainingType();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/training/country/get")]
        public IActionResult GetTrainingCountry()
        {
            Response response = new Response("/setup/basic/training/country/get");
            var result = BasicEntry.GetTrainingCountry();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/training/institute/get")]
        public IActionResult GetTrainingInstitute()
        {
            Response response = new Response("/setup/basic//training/institute/get");
            var result = BasicEntry.GetTrainingInstitute();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/training/nature/get")]
        public IActionResult GetTrainingNature()
        {
            Response response = new Response("/setup/basic/training/nature/get");
            var result = BasicEntry.GetTrainingNature();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/training/sponsor/get")]
        public IActionResult GetTrainingSponsorBy()
        {
            Response response = new Response("/setup/basic/training/sponsor/get");
            var result = BasicEntry.GetTrainingSponserBy();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/project/get")]
        public IActionResult GetProject()
        {
            Response response = new Response("/setup/basic/project/get");
            var result = BasicEntry.GetProject();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/occupation/get")]
        public IActionResult GetOccupation()
        {
            Response response = new Response("/setup/basic/occupation/get");
            var occupation = BasicEntry.GetOccupation();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/experience/type/get")]
        public IActionResult GetExperienceType()
        {
            Response response = new Response("/setup/basic/experience/type/get");
            var experience = BasicEntry.GetExperienceType();
            try
            {
                if (experience.Count > 0)
                {
                    response.Status = true;
                    response.Result = experience;
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
        [Route("api/v{version:apiVersion}/setup/basic/punishment/get")]
        public IActionResult GetPunishment()
        {
            Response response = new Response("/setup/basic/punishment/get");
            var result = BasicEntry.GetPunishment();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/branch/get")]
        public IActionResult GetBranch()
        {
            Response response = new Response("/setup/basic/branch/get");
            var branch = BasicEntry.GetBranch();
            try
            {
                if (branch.Count > 0)
                {
                    response.Status = true;
                    response.Result = branch;
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
        [Route("api/v{version:apiVersion}/setup/basic/unit/get")]
        public IActionResult GetUnit()
        {
            Response response = new Response("/setup/basic/unit/get");
            var result = BasicEntry.GetUnit();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/signatory/get/compId/{compId}")]
        public IActionResult GetSignatory(int compId)
        {
            Response response = new Response($"/setup/basic/signatory/get/compId/{compId}");
            var result = BasicEntry.GetSignatory(compId);
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/misconduct/get")]
        public IActionResult GetMisconduct()
        {
            Response response = new Response("/setup/basic/misconduct/get");
            var result = BasicEntry.GetMisconduct();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/prefix/get")]
        public IActionResult GetPrefix()
        {
            Response response = new Response("/setup/basic/prefix/get");
            var prefix = BasicEntry.GetPrefix();
            try
            {
                if (prefix.Count > 0)
                {
                    response.Status = true;
                    response.Result = prefix;
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
        [Route("api/v{version:apiVersion}/setup/basic/suffix/get")]
        public IActionResult GetSuffix()
        {
            Response response = new Response("/setup/basic/suffix/get");
            var suffix = BasicEntry.GetSuffix();
            try
            {
                if (suffix.Count > 0)
                {
                    response.Status = true;
                    response.Result = suffix;
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
        [Route("api/v{version:apiVersion}/setup/basic/publication/type/get")]
        public IActionResult GetPublicationType()
        {
            Response response = new Response("/setup/basic/publication/type/get");
            try
            {
                var result = BasicEntry.GetPublicationType();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/designationPublication/get")]
        public IActionResult GetDesignationPublication()
        {
            Response response = new Response("/setup/basic/designationPublication/get");
            try
            {
                var result = BasicEntry.GetDesignationPublication();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/relationship/get")]
        public IActionResult GetRelationship()
        {
            Response response = new Response("/setup/basic/relationship/get");
            var relationship = BasicEntry.GetRelationShip();
            try
            {
                if (relationship.Count > 0)
                {
                    response.Status = true;
                    response.Result = relationship;
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
        [Route("api/v{version:apiVersion}/setup/basic/job/type/get")]
        public IActionResult GetJobType()
        {
            Response response = new Response("/setup/basic/job/type/get");
            try
            {
                var result = BasicEntry.GetJobType();
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/organization/get")]
        public IActionResult GetOrganization()
        {
            Response response = new Response("/setup/basic/organization/get");
            try
            {
                var organizations = BasicEntry.GetOrganization();
                if (organizations.Count > 0)
                {
                    response.Status = true;
                    response.Result = organizations;
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



        //ShowCauseRules Section
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/showcauserules/get")]
        public IActionResult ShowCauseRules()
        {
            Response response = new Response("/setup/basic/showcauserules/get");
            try
            {
                var showcauserules = BasicEntry.GetShowCauseRules();
                if (showcauserules.Count > 0)
                {
                    response.Status = true;
                    response.Result = showcauserules;
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
        [Route("api/v{version:apiVersion}/setup/basic/showcauserulestype/get")]
        public IActionResult ShowCauseRulesType()
        {
            Response response = new Response("/setup/basic/showcauserulestype/get");
            try
            {
                var showcauserules = BasicEntry.GetAllShowcauseResultType();
                if (showcauserules.Count > 0)
                {
                    response.Status = true;
                    response.Result = showcauserules;
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
        [Route("api/v{version:apiVersion}/setup/basic/showcauseresultdetails/get")]
        public IActionResult ShowCauseResultDetails()
        {
            Response response = new Response("/setup/basic/showcauseresultdetails/get");
            try
            {
                var showcauserules = BasicEntry.GetAllShowcauseResultDetails();
                if (showcauserules.Count > 0)
                {
                    response.Status = true;
                    response.Result = showcauserules;
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

        //===============Get All Action Type ======================
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/action/get")]
        public IActionResult getAllAction()
        {
            Response response = new Response("/setup/basic/action/get");
            try
            {
                var action = BasicEntry.getAllAction();
                if (action.Count > 0)
                {
                    response.Status = true;
                    response.Result = action;
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
        [Route("api/v{version:apiVersion}/setup/basic/natureofpunishment/getall")]
        public IActionResult getAllNatureOfPunishment()
        {
            Response response = new Response("api/setyp/basic/natureofpunishment/getall");
            try
            {
                var natureOfPunishment = BasicEntry.getAllPunishmentType();
                if (natureOfPunishment.Count > 0)
                {
                    response.Status = true;
                    response.Result = natureOfPunishment;
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

        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/productionunit/get/{compId}")]
        public IActionResult GetProductionUnit(int compId)
        {
            Response response = new Response("/setup/basic/productionunit/get" + compId);
            try
            {
                var prodUnit = BasicEntry.GetProductionUnit(compId);
                if (prodUnit.Count > 0)
                {
                    response.Status = true;
                    response.Result = prodUnit;
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
        [Route("api/v{version:apiVersion}/setup/basic/prodctionline/get/compId/{compId}/unitId/{unitID}")]
        public IActionResult GetProductionLine(int compId, int unitID)
        {
            Response response = new Response("api/setup/basic/prodctionline/get/compId/" + compId + "/unitId/" + unitID);
            try
            {
                var proLine = BasicEntry.GetProductionLine(compId, unitID);
                if (proLine.Count > 0)
                {
                    response.Status = true;
                    response.Result = proLine;
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

        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/maritalStatus/get")]
        public IActionResult GetMaritalStatus()
        {
            Response response = new Response("/setup/basic/maritalStatus/get");
            try
            {
                var maritalStatus = BasicEntry.GetMaritalStatus();
                if (maritalStatus.Count > 0)
                {
                    response.Status = true;
                    response.Result = maritalStatus;
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


        //======================================== Get All Salary Type

        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/type/getall")]
        public IActionResult GetAllType()
        {
            Response response = new Response("/setup/basic/type/getall");
            try
            {
                var result = BasicEntry.GetAllType();
                if (result.Count > 0)
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/businesNature/get/compId/{compId}/departmentId/{deptId}")]
        public IActionResult GetBusinessNature(int compId, int deptId=-1)
        {
            Response response = new Response("/setup/basic/businesNature/get");
            var result = BasicEntry.GetAllBusinessNature( compId, deptId);
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
        [Route("api/v{version:apiVersion}/setup/basic/businessNature/saveupdate")]
        public IActionResult SaveOrUpdateBusinessNature(BusinessNatureModel model)
        {
            Response response = new Response("/setup/basic/saveupdatebasicentry");
            try
            {
                if (model.ID == 0)
                {
                    response.Status = BasicEntry.SaveBusinessNature(model);
                    if (response.Status)
                    {
                        response.Result = "Section Saved Successfully";
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
                    response.Status = BasicEntry.UpdateBusinessNature(model);
                    if (response.Status)
                    {
                        response.Result = "Section Update Successfully";
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
        [Route("api/v{version:apiVersion}/setup/basic/businessNature/id/{id}/compID/{companyID}")]
        public IActionResult DeleteBusinessNature(int id, int companyID)
        {
            Response response = new Response("/setup/basic/businessNature/id/" + id + "/compID/" + companyID);
            try
            {
                response.Status = BasicEntry.DeleteBusinessNature(id, companyID);
                if (response.Status)
                {

                    response.Result = "Delete Successfull";
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/businessNature/get/id/{id}")]
        public IActionResult GetByIdBasicEntry(int id)
        {
            Response response = new Response("//setup/basic/businessNature/get/id/"+id);

            try
            {
                var result = BasicEntry.GetByIdBusinessNature(id);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/setup/basic/saveThana/ThanaName/UpazilaID/")]
        public IActionResult SaveThana(Thana thana)
        {
            Response response = new Response("/setup/basic/saveThana/ThanaName/UpazilaID/");

            try
            {
                var result = BasicEntry.SaveThana(thana);
                if (result)
                {
                    response.Status = true;
                    response.Result = "Save Successfully";
                }
                else
                {
                    response.Status = false;
                    response.Result = "Fail To Save";
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
        [Route("api/v{version:apiVersion}/setup/basic/thanaDependency/get/thanaId/{thanaId}")]
        public IActionResult GetThanaDependency(int thanaId)
        {
            Response response = new Response("/setup/basic/thanaDependency/get/thanaId/" + thanaId);

            try
            {
                var result = BasicEntry.GetThanaDependency(thanaId);
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/setup/basic/getAllThana")]
        public IActionResult GetAllThana(int id)
        {
            Response response = new Response("/setup/basic/getAllThana");

            try
            {
                var result = BasicEntry.getAllThana();
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
            catch (Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

    }
}

