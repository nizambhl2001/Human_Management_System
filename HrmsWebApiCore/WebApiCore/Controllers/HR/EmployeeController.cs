using System;
using System.Data.SqlClient;
using Dapper.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using WebApiCore.DbContext.HR;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels;
using WebApiCore.ViewModels.HR;
using WebApiCore.ViewModels.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    [Authorize()]
    [ApiVersion("1")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        [Authorize()]
        //Employee General Info
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/genInfo/save")]
        public IActionResult SaveGenInfo(EmpGenInfoModel empGenInfo)

        {
            Response response = new Response("/hr/employee/genInfo/save");
            try
            {
                if (empGenInfo.id == 0 || empGenInfo.id==null)
                {
                    response.Status = Employee.SaveEmpGenInfo(empGenInfo);
                    if (response.Status)
                    {
                        response.Result = "Saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save!";
                    }
                }
                else
                {
                    response.Status = Employee.UpdateEmpGenInfo(empGenInfo);
                    if (response.Status)
                    {
                        response.Result = "Updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update!";
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
        [Route("api/v{version:apiVersion}/hr/employee/search")]
        public IActionResult SearchEmployee(EmpSearchViewModel serachKeys)
        {
            Response response = new Response("/hr/employment/search");
            try
            {
                var employees = Employee.SearchEmployee(serachKeys);
                if (employees.Count > 0)
                {
                    response.Status = true;
                    response.Result = employees;
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
        [Route("api/v{version:apiVersion}/hr/employeeGenInfo/empCode/Name/gradeValue/{GradeValue}")]
        public IActionResult GetAllEmployeeCodeNameGenInfo(int GradeValue)
        {
            Response response = new Response("/hr/employeeGenInfo/empCode/Name/gradeValue/"+GradeValue);
            try
            {
                var employees = Employee.allEmployeeGenInfo(GradeValue);
                if (employees.Count > 0)
                {
                    response.Status = true;
                    response.Result = employees;
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
        [Route("api/v{version:apiVersion}/hr/Blockemployee/empCode/Name/gradeValue/{GradeValue}")]
        public IActionResult GetAllBlockEmployeeCode(int GradeValue)
        {
            Response response = new Response("/hr/Blockemployee/empCode/Name/gradeValue/" + GradeValue);
            try
            {
                var employees = Employee.allBlockEmployeeInfo(GradeValue);
                if (employees.Count > 0)
                {
                    response.Status = true;
                    response.Result = employees;
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
        [Route("api/v{version:apiVersion}/hr/employeeForBlock/empCode/Name/gradeValue/{GradeValue}")]
        public IActionResult BlockEmployeeCode(int GradeValue)
        {
            Response response = new Response("/hr/employeeForBlock/empCode/Name/gradeValue/" + GradeValue);
            try
            {
                var employees = Employee.BlockEmployee(GradeValue);
                if (employees.Count > 0)
                {
                    response.Status = true;
                    response.Result = employees;
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
        [Route("api/v{version:apiVersion}/hr/employeeGenInfo/empCode/Name/salaryReport/gradeValue/{GradeValue}")]
        public IActionResult GetAllEmployeeCodeForSalaryReport(int GradeValue)
        {
            Response response = new Response("/hr/employeeGenInfo/empCode/Name/gradeValue/" + GradeValue);
            try
            {
                var employees = Employee.allEmployeesForSalaryReport(GradeValue);
                if (employees.Count > 0)
                {
                    response.Status = true;
                    response.Result = employees;
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
        [Route("api/v{version:apiVersion}/hr/employee/genInfo/get/gradeVal/{gradeVal}/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetGenInfo(int gradeVal, int compId, string empCode)
        {
            Response response = new Response("/hr/employee/genInfo/get/gradeVal/" + gradeVal + "/compId/" + compId + "/empCode/" + empCode);
            try
            {
                EmpGenInfoModel employee = Employee.GetEmpGenInfo(gradeVal, compId, empCode);
                if (employee != null)
                {
                    response.Status = true;
                    response.Result = employee;
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
        [Route("api/v{version:apiVersion}/hr/employee/details/empCode/{empCode}/compId/{compId}")]
        public IActionResult GetEmpDetails(string empCode, int compId)
        {
            Response response = new Response("/hr/employee/details/empCode/" + empCode + "/compId/" + compId);
            try
            {
                EmployeeViewModel empVm = Employee.GetEmpDetails(empCode, compId);
                if (empVm != null)
                {
                    response.Status = true;
                    response.Result = empVm;
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
        //Employee Family Info
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/familyInfo/get/compId/{companyId}/empCode/{empCode}")]
        public IActionResult GetFamilyInfo(int companyId, string empCode)
        {
            Response response = new Response("api/v{version:apiVersion}/hr/employee/familyInfo/get/compId/" + companyId + "/empCode/" + empCode);
            try
            {
                var family = Employee.GetEmpFamilyInfo(companyId, empCode);
                if (family.Count > 0)
                {
                    response.Status = true;
                    response.Result = family;
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
        [Route("api/v{version:apiVersion}/hr/employee/familyMember/get/personId/{personId}")]
        public IActionResult GetFamilyMember(int personId)
        {
            Response response = new Response("/hr/employee/familyMember/get/personId/" + personId);
            try
            {
                EmpFamilyInfoModel person = Employee.GetFamilyMember(personId);
                if (person != null)
                {
                    response.Status = true;
                    response.Result = person;
                }
                else
                {
                    response.Status = false;
                    response.Result = "Member Not found";
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
        [Route("api/v{version:apiVersion}/hr/employee/familyInfo/save")]
        public IActionResult SaveFamilyInfo(EmpFamilyInfoModel empFamily)
        {
            Response response = new Response("/hr/employee/genInfo/save");
            try
            {
                if (empFamily.ID == 0)
                {
                    response.Status = Employee.SaveEmpFamilyInfo(empFamily);
                    if (response.Status)
                    {
                        response.Result = "Saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save!";
                    }
                }
                else
                {
                    response.Status = Employee.UpdateEmpFamilyInfo(empFamily);
                    if (response.Status)
                    {
                        response.Result = "Updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update!";
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
        [HttpDelete]
        [Route("api/v{version:apiVersion}/hr/employee/familyInfo/delete/personId/{personId}")]
        public IActionResult DeleteEmpFamily(int personId)
        {
            Response response = new Response("/hr/employee/familyInfo/delete/personId" + personId);
            try
            {
                response.Status = Employee.DeleteEmpFamily(personId);
                if (response.Status)
                {
                    response.Result = "Family member removed!";
                }
                else
                {
                    response.Result = "Failed to remove family member!";
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
        //Employee Contact Info
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/contactInfo/save")]
        public IActionResult SaveContactInfo(EmpContactInfoModel empContact)
        {
            Response response = new Response("/hr/employee/contactInfo/save");
            try
            {
                if (empContact.ID == 0)
                {
                    response.Status = Employee.SaveEmpContactInfo(empContact);
                    if (response.Status)
                    {
                        response.Result = "Saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save!";
                    }
                }
                else
                {
                    response.Status = Employee.UpdateEmpContactInfo(empContact);
                    if (response.Status)
                    {
                        response.Result = "Updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update!";
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
        [Route("api/v{version:apiVersion}/hr/employee/contactInfo/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetEmpContactInfo(int compId, string empCode)
        {
            Response response = new Response("/hr/employee/contactInfo/get/compId/" + compId + "/empCode/" + empCode);
            try
            {
                EmpContactInfoViewModel empContactInfo = Employee.GetEmpContactInfo(compId, empCode);
                if (empContactInfo != null)
                {
                    response.Status = true;
                    response.Result = empContactInfo;
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

        //Employee Reference
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/reference/save")]
        public IActionResult SaveEmpRef(EmpReferenceModel empRef)
        {
            Response response = new Response("/hr/employee/reference/save");
            try {
                response.Status = Employee.SaveEmpRef(empRef);
                if (response.Status)
                {
                    response.Result = "Saved Successfully!";
                }
                else
                {
                    response.Result = "Failed to save!";
                }
                return Ok(response);
            }
            catch (Exception err) {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);

            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/reference/update")]
        public IActionResult UpdateEmpRef(EmpReferenceModel empRef)
        {
            Response response = new Response("/hr/employee/reference/update");
            try
            {
                response.Status = Employee.UpdateEmpRef(empRef);
                if (response.Status)
                {
                    response.Result = "Updated successfully!";
                }
                else
                {
                    response.Result = "Failed to update";
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/reference/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetEmpReferences(int compId, string empCode)
        {
            Response response = new Response("/hr/employee/reference/get/compId/" + compId + "/empCode/" + empCode);
            try
            {
                var references = Employee.GetEmpReferences(compId, empCode);
                if (references.Count > 0)
                {
                    response.Status = true;
                    response.Result = references;
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/reference/get/referenceId/{referenceId}")]
        public IActionResult GetReference(int referenceId)
        {
            Response response = new Response("/hr/employee/reference/referenceId/" + referenceId);
            try
            {
                var reference = Employee.GetEmpReference(referenceId);
                if (reference != null)
                {
                    response.Status = true;
                    response.Result = reference;
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

        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/hr/employee/reference/delete/referenceId/{referenceId}")]
        public IActionResult DeleteEmpRef(int referenceId)
        {
            Response response = new Response("/hr/employee/reference/delete/referenceId/" + referenceId);
            try
            {
                response.Status = Employee.DeleteEmpRef(referenceId);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Result = "failed to delete!";
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
        //Employee Education
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/education/save")]
        public IActionResult SaveEmpEdu(EmpEducationInfoModel empEdu)
        {
            Response response = new Response("/hr/employee/education/save");
            try
            {
                response.Status = Employee.SaveEmpEducation(empEdu);
                if (response.Status)
                {
                    response.Result = "Saved successfully!";
                }
                else
                {
                    response.Result = "failed to save!";
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
        [Route("api/v{version:apiVersion}/hr/employee/education/update")]
        public IActionResult UpdateEducation(EmpEducationInfoModel empEdu)
        {
            Response response = new Response("/hr/employee/education/update");
            try
            {
                response.Status = Employee.UpdateEmpEducation(empEdu);
                if (response.Status)
                {
                    response.Result = "Updated successfully!";
                }
                else
                {
                    response.Result = "Failed to update";
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/education/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetEmpEducation(int compId, string empCode)
        {
            Response response = new Response("/hr/employee/education/get/compId/" + compId + "/empCode/" + empCode);
            try
            {
                var educations = Employee.GetEmpEducation(compId, empCode);
                if (educations.Count > 0)
                {
                    response.Status = true;
                    response.Result = educations;
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/education/get/empEduId/{empEduId}")]
        public IActionResult GetEmpEducation(int empEduId)
        {
            Response response = new Response("/hr/employee/education/get/empEduId/"+empEduId);
            try
            {
                var education = Employee.GetEmpEducation(empEduId);
                if (education != null)
                {
                    response.Status = true;
                    response.Result = education;
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

        [Authorize()]
        [HttpDelete]
        [Route("api/v{version:apiVersion}/hr/employee/education/delete/empEduId/{empEduId}")]
        public IActionResult DeleteEmpEdu(int empEduId)
        {
            Response response = new Response("/hr/employee/education/delete/empEduId/" + empEduId);
            try
            {
                response.Status = Employee.DeleteEmpEdu(empEduId);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Result = "Failed to delete";
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
        //Employee Experience
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/experience/save")]
        public IActionResult SaveEmpExperience(EmpExperienceModel empExp)
        {
            Response response = new Response("/hr/employee/experience/save");
            try
            {
                response.Status = Employee.SaveEmpExperience(empExp);
                if (response.Status)
                {
                    response.Result = "Experience saved successfully!";
                }
                else
                {
                    response.Result = "Failed to save experience!";
                }
                return Ok(response);
            }catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/experience/update")]
        public IActionResult UpdateEmpExperience(EmpExperienceModel empExp) {
            Response response = new Response("/hr/employee/experience/update");
            try
            {
                response.Status = Employee.UpdateEmpExperience(empExp);
                if (response.Status)
                {
                    response.Result = "Updated successfully!";
                }
                else
                {
                    response.Result = "Failed to update";
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
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/experience/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetEmpAllExperience(int compId, string empCode)
        {
            Response response = new Response("/hr/employee/experience/get/compId/"+compId+"/empCode/"+empCode);
            try
            {
                var experiences = Employee.GetEmpAllExperience(compId, empCode);
                if (experiences.Count > 0)
                {
                    response.Status = true;
                    response.Result = experiences;
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

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/experience/get/experienceId/{experienceId}")]
        public IActionResult GetEmpExperience(int experienceId)
        {
            Response response = new Response("/hr/employee/experience/get/experienceId/" + experienceId);
            try
            {
                var experience = Employee.GetEmpExperinece(experienceId);
                if (experience != null)
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
            catch(Exception err)
            {
                response.Status = false;
                response.Result = err.Message;
                return Ok(response);
            }
        }

        [Authorize()]

        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/experience/delete/experienceId/{experienceId}")]
        public IActionResult DeleteEmpExp(int experienceId)
        {
            Response response = new Response("/hr/employee/experince/delete/experienceId/" + experienceId);
            try
            {
                response.Status = Employee.DeleteEmpExperience(experienceId);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Result = "Failed to delete";
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


        //////////////empTrainingInfoo////
        [Authorize()]

        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/training/get/compId/{compId}/empCode/{empCode}")]
        public IActionResult GetEmpAllTraining(int compId, string empCode)
        {
            Response response = new Response("/hr/employee/training/get/compId/" + compId + "/empCode/" + empCode);
            try
            {
                var result = Employee.getAllEmpTrainingInfo(compId, empCode);
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
        [Route("api/v{version:apiVersion}/hr/employee/training/get/id/{Id}")]
        public IActionResult GetEmpTraining(int Id)
        {
            Response response = new Response("/hr/employee/training/get/id/" + Id);
            try
            {
                var result = Employee.GetEmpTraining(Id);
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
        [Route("api/v{version:apiVersion}/hr/employee/training/save")]
        public IActionResult SaveUpdateEmpTraining(EmpTrainingModel emptraining)
        {
            Response response = new Response("/hr/employee/training/save");
            try
            {
                if (emptraining.ID == 0)
                {
                    response.Status = Employee.SaveEmpTraining(emptraining);
                    if (response.Status)
                    {
                        response.Result = "Training Information is saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save experience!";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = Employee.UpdateEmpTraining(emptraining);
                    if (response.Status)
                    {
                        response.Result = "Training Information is updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update Training Informatio!";
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
        [Route("api/v{version:apiVersion}/hr/employee/training/delete/empTrainID/{empTrainID}")]
        public IActionResult DeleteEmpTraining(int empTrainID)
        {
            Response response = new Response("/hr/employee/training/delete/empTrainID/" + empTrainID);
            try
            {
                response.Status = Employee.DeleteEmpTraining(empTrainID);
                if (response.Status)
                {
                    response.Result = "Deleted successfully!";
                }
                else
                {
                    response.Result = "Failed to delete";
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
        //////////////scholarship info/////////////////

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/scholarship/saveupdatedeleteandget/{pOptions}")]
        public IActionResult SaveUpdatedeleteGetScholarship(EmpScholarshipModel scholarship,int pOptions)
        {
            Response response = new Response("/hr/employee/scholarship/saveupdatedeleteandget/"+ pOptions);
            try
            {
                if (pOptions == 1)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpScholarship(scholarship, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Training Scholarship is saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save Scholarship!";
                    }
                    return Ok(response);
                }
                else if(pOptions == 2)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpScholarship(scholarship, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Training Scholarship is updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update Scholarship!";
                    }
                    return Ok(response);
                }
                else 
                {
                    response.Status = Employee.SaveUpdateDeleteEmpScholarship(scholarship,pOptions);
                    if (response.Status)
                    {
                        response.Result = "Deleted successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to delete";
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/scholarship/getallscholarship/{pOptions}")]
        public IActionResult GetEmpAllScholarship(EmpScholarshipModel scholarship, int pOptions)
        {
            Response response = new Response("/hr/employee/scholarship/getallscholarship/" + pOptions);
            try
            {
                if (pOptions == 4)
                {

                    var result = Employee.getAllEmpScholarship(scholarship, pOptions);
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

        //////////////Emp Publication /////////////////

        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/publication/GetEmpAllPublication/compID/{companyID}/empCode/{empCode}")]
        public IActionResult GetEmpAllPublication(int companyID,string empCode)
        {
            Response response = new Response("/hr/employee/publication/GetEmpAllPublication/compID/" + companyID + "/empCode/"+empCode);
            try
            {
                var result = Employee.getAllEmpPublication(companyID, empCode);
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
        [Route("api/v{version:apiVersion}/hr/employee/publication/GetEmpChildPublication/compID/{companyID}/empCode/{empCode}")]
        public IActionResult GetEmpChildPublication(int companyID, string empCode)
        {
            Response response = new Response("/hr/employee/publication/GetEmpChildPublication/compID/" + companyID + "/empCode/" + empCode);
            try
            {
                var result = Employee.getAllChildPublication(companyID, empCode);
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
        [Route("api/v{version:apiVersion}/hr/employee/publication/SaveUpdatePublication")]
        public IActionResult SaveUpdatePublication(EmpPublicationModel publication)
        {
            Response response = new Response("/hr/employee/publication/SaveUpdatePublication" );
            try
            {
                if (publication.ID == 0)
                {
                    response.Status = Employee.SaveEmpPublication(publication);
                    if(response.Status)
                    {
                        response.Result = "Publication is saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save Publication!";
                    }
                    return Ok(response);
                }
                else 
                {
                    response.Status = Employee.UpdateEmpPublication(publication);
                    if(response.Status)
                    {
                        response.Result = "TPublication is updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update Publication!";
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

        /////////////////////Emp Professional Qualification/////////////////


        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/qualification/saveupdatedeleteandqualification/{pOptions}")]
        public IActionResult SaveUpdatedeleteQualification(EmpQualificationModel qualification, int pOptions)
        {
            Response response = new Response("/hr/employee/qualification/saveupdatedeleteandqualification/" + pOptions);
            try
            {
                if (pOptions == 1)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpQualification(qualification, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Professional Qualification is saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save Professional Qualification!";
                    }
                    return Ok(response);
                }
                else if (pOptions == 2)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpQualification(qualification, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Professional Qualification is updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update Professional Qualification!";
                    }
                    return Ok(response);
                }
                else
                {
                    response.Status = Employee.SaveUpdateDeleteEmpQualification(qualification, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Deleted successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to delete";
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
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/qualification/getAllqualification/{pOptions}")]
        public IActionResult GetEmpAllQualification(EmpQualificationModel qualification, int pOptions)
        {
            Response response = new Response("/hr/employee/qualification/getAllqualification/" + pOptions);
            try
            {
                if (pOptions == 4)
                {

                    var result = Employee.getAllEmpqualification(qualification, pOptions);
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


                }
                else if(pOptions==5)
                {
                    var result = Employee.getEmpqualificationbyID(qualification, pOptions);
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

                }
                else
                {
                    var result = Employee.getAllEmpqualification(qualification, pOptions);
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


        //// //////Employee Award info//////

        [Authorize()]
        [HttpPost]
        [Route("api/v{version:apiVersion}/hr/employee/award/SaveUpdatedeleteEmpAward/{pOptions}")]
        public IActionResult SaveUpdatedeleteEmpAward(EmpAwardModel award, int pOptions)
        {
            Response response = new Response("/hr/employee/award/SaveUpdatedeleteEmpAward/" + pOptions);
            try
            {
                if (pOptions == 1)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpAward(award, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Award is saved successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to save Award!";
                    }
                    
                }
                else if (pOptions == 2)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpAward(award, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Award is updated successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to update Award!";
                    }
                    
                }
                else if(pOptions==3)
                {
                    response.Status = Employee.SaveUpdateDeleteEmpAward(award, pOptions);
                    if (response.Status)
                    {
                        response.Result = "Deleted successfully!";
                    }
                    else
                    {
                        response.Result = "Failed to delete";
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
        [Route("api/v{version:apiVersion}/hr/employee/award/GetEmpAllAward/{pOptions}")]
        public IActionResult GetEmpAllAward(EmpAwardModel award, int pOptions)
        {
            Response response = new Response("/hr/employee/award/GetEmpAllAward/" + pOptions);
            try
            {
                if (pOptions == 4)
                {

                    var result = Employee.getAllEmpAward(award, pOptions);
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


                }
                else if (pOptions == 5)
                {
                    var result = Employee.getEmpAwardbyID(award, pOptions);
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

                }
                else if(pOptions==6)
                {
                    var result = Employee.getAllEmpAward(award, pOptions);
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
        [Authorize]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/genInfo/getMaxEmpCode")]
        public IActionResult GetMaxEmployeeCode()
        {
            try
            {
                int maxEmpCode = 0;

                using (var con = new SqlConnection(Connection.ConnectionString()))
                {
                    string sql = "select MAx( convert (int, EmpCode)) FROM EmpGeneralInfo";
                    maxEmpCode = con.ExecuteScalar<int>(sql);
                    maxEmpCode = maxEmpCode + 1;
                }
                return Ok(maxEmpCode);

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        [Authorize()]
        [HttpGet]
        [Route("api/v{version:apiVersion}/hr/employee/getByBoss/{bossEmpCode}")]
        public IActionResult GetEmployeeByBoss(string bossEmpCode)
        {
            Response response = new Response("/hr/employee/getByBoss/" + bossEmpCode);
            var result = Employee.GetEmpByBoss(bossEmpCode);
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
                    response.Result = "Record not found.";
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
        [Route("api/v{version:apiVersion}/hr/employee/GetAllLateComer/compId/{compId}/cDate/{cDate}")]
        [HttpGet]
        public IActionResult GetAllLateComer(int compId, string cDate)

        {

            try
            {
                var allLeaveCount = Employee.GetAllLateComer(compId, cDate);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetAllEmployeeCount/CompId/{CompId}")]
        [HttpGet]
        public IActionResult GetAllEmployeeCount(int CompId)

        {

            try
            {
                var AllEmployeeCount = Employee.GetAllEmployeeCount(CompId);

                return Ok(new { status = true, result = AllEmployeeCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetAllLeaveCount/laveDate/{laveDate}")]
        [HttpGet]
        public IActionResult GetAllLeaveCount(string laveDate)

        {

            try
            {
                var allLeaveCount = Employee.GetAllLeaveCount(laveDate);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetAllAbsentCount/compId/{compId}/cDate/{cDate}")]
        [HttpGet]
        public IActionResult GetAllAbsentCount(int compId, string cDate)

        {

            try
            {
                var allLeaveCount = Employee.GetAllAbsentCount(compId, cDate);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetAllEmpHistory/compId/{compId}/cDate/{cDate}")]
        [HttpGet]
        public IActionResult GetAllEmpHistory(int compId, string cDate)

        {

            try
            {
                var allLeaveCount = Employee.GetAllEmpHistory(compId, cDate);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetEmpByProject")]
        [HttpPost]
        public IActionResult GetEmpByProject(EmpDetailsModel empDetail)

        {

            try
            {
                var allLeaveCount = Employee.GetEmpByProject(empDetail);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize()]
        //[Route("api/v{version:apiVersion}/hr/employee/GetAllEmpDetailsToday/compId/{compId}/currentDate/{currentDate}/type/{type}/projectID/{projectID?}/jobLocation/{jobLocation?}/departmentID/{departmentID?}")]
        [Route("api/v{version:apiVersion}/hr/employee/GetAllEmpDetailsToday")]
        [HttpPost]
        public IActionResult GetAllEmpDetailsToday(EmpDetailsModel empDetail)

        {
            Response response = new Response("/hr/employee/GetAllEmpDetailsToday");

            try
            {
                var allEmpDatails = Employee.GetAllEmpDetailsToday(empDetail);

                return Ok(new { status = true, result = allEmpDatails });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/GetReportingBoss/compId/{compId}/empCode/{empCode}")]
        [HttpGet]
        public IActionResult GetReportingBoss( int compId,string empCode)

        {

            try
            {
                var allLeaveCount = Employee.GetReportingBoss(compId, empCode);

                return Ok(new { status = true, result = allLeaveCount });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/EmpDetailsByReportingBoss/currentdate/{currentdate}/reportingBoss/{reportingBoss}")]
        [HttpGet]
        public IActionResult EmpDetailsByReportingBoss( string currentdate,string reportingBoss)

        {

            try
            {
                var EmpDetails = Employee.EmpDetailsByReportingBoss(currentdate, reportingBoss);

                return Ok(new { status = true, result = EmpDetails });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
        
        
        [Authorize()]
        [Route("api/v{version:apiVersion}/hr/employee/EmpDetailsBySupervisor/currentdate/{currentdate}/reportingBoss/{reportingBoss}")]
        [HttpGet]
        public IActionResult EmpDetailsBySupervisor( string currentdate,string reportingBoss)

        {

            try
            {
                var EmpDetails = Employee.EmpDetailsBySupervisor(currentdate, reportingBoss);

                return Ok(new { status = true, result = EmpDetails });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



    }
}
