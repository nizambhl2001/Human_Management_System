using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using WebApiCore.Helper;
using WebApiCore.Models.HR.Employee;
using WebApiCore.ViewModels.HR;
using WebApiCore.ViewModels.HR.Employee;

namespace WebApiCore.DbContext.HR
{
    public static class Employee
    {
        //General Info
        public static bool SaveEmpGenInfo(EmpGenInfoModel empGen)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var empGenObj = new
                {
                    empGen.EmpCode,
                    empGen.EmpName,
                    empGen.LastName,
                    empGen.ShortName,
                    empGen.FName,
                    empGen.FatherOccupation,
                    empGen.MotherOccupation,
                    empGen.MName,
                    empGen.WifeName,
                    empGen.Nationality,
                    empGen.Weight,
                    empGen.Height,
                    empGen.Gender,
                    empGen.DOB,
                    empGen.NationalId,
                    empGen.TINNo,
                    empGen.Religion,
                    empGen.meritalStatus,
                    empGen.PasportNo,
                    empGen.BloodGroup,
                    empGen.Remarks,
                    empGen.CompanyID,
                    GradeValue = (empGen.GradeValue==null)?0:empGen.GradeValue,
                    empGen.Picture,
                    empGen.Signature,
                    empGen.PassportExpairedDate,
                    empGen.Title,
                    empGen.Suffix,
                    empGen.Child,
                    empGen.PassportIssueDate
                };
                int rowAffect = con.Execute("sp_EmpGeneralInfo_Insert", param: empGenObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static EmpGenInfoModel GetEmpGenInfo(int gradeVal, int companyId, string empCode)
        {

            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string filter = (gradeVal == -1) ? "GradeValue OR GradeValue IS NULL" : gradeVal.ToString();
                string sql = $"SELECT * FROM EmpGeneralInfo Egi WHERE  Active=1 AND EmpCode='" + empCode + "'AND CompanyID=" + companyId;
                //string sql = $"SELECT * FROM EmpGeneralInfo  WHERE Active=1 AND EmpCode='" + empCode + "'AND CompanyID=" + companyId;
                EmpGenInfoModel employee = con.QuerySingle<EmpGenInfoModel>(sql);
                employee.Age = DateManipulate.DateDiff(employee.DOB, DateTime.Now);
                return employee;
            }
        
        }
        public static bool UpdateEmpGenInfo(EmpGenInfoModel empGen)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var empGenObj = new
                {
                    empGen.EmpCode,
                    empGen.EmpName,
                    empGen.LastName,
                    empGen.ShortName,
                    empGen.FName,
                    empGen.FatherOccupation,
                    empGen.MotherOccupation,
                    empGen.MName,
                    empGen.WifeName,
                    empGen.Nationality,
                    empGen.Weight,
                    empGen.Height,
                    empGen.Gender,
                    empGen.DOB,
                    empGen.NationalId,
                    empGen.TINNo,
                    empGen.Religion,
                    empGen.meritalStatus,
                    empGen.PasportNo,
                    empGen.BloodGroup,
                    empGen.Remarks,
                    empGen.CompanyID,
                    GradeValue = (empGen.GradeValue == null) ? 0 : empGen.GradeValue,
                    empGen.Picture,
                    empGen.Signature,
                    empGen.PassportExpairedDate,
                    empGen.Title,
                    empGen.Suffix,
                    empGen.Child,
                    empGen.PassportIssueDate
                };
                int rowAffect = con.Execute("sp_EmpGeneralInfo_Update", param: empGenObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        //Contact Info
        public static bool SaveEmpContactInfo(EmpContactInfoModel empContact)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empContact.EmpCode,
                    empContact.MobileNo,
                    empContact.PhoneNo,
                    empContact.Email,
                    empContact.PreThanaID,
                    empContact.PerThanaID,
                    empContact.PrePostOffice,
                    empContact.PerPostOffice,
                    empContact.PreVillage,
                    empContact.PerVillage,
                    empContact.PersonName,
                    empContact.PersonContact,
                    empContact.PersonAddress,
                    empContact.CompanyID,
                    empContact.Relationship,
                    empContact.PreCountry,
                    empContact.PerCountry,
                    empContact.PrePostCode,
                    empContact.PerPostCode,
                    empContact.MailingAddress,
                    empContact.SecondaryMobile,
                    empContact.SecandaryMail,
                    empContact.SocialURL1,
                    empContact.SocialURL2,
                    empContact.EmergrncyPostCode,
                    empContact.EmergrncyPostCountry
                };
                int rowAffect = con.Execute("sp_EmpContactInfo_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEmpContactInfo(EmpContactInfoModel empContact)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empContact.ID,
                    empContact.EmpCode,
                    empContact.MobileNo,
                    empContact.PhoneNo,
                    empContact.Email,
                    empContact.PreThanaID,
                    empContact.PerThanaID,
                    empContact.PrePostOffice,
                    empContact.PerPostOffice,
                    empContact.PreVillage,
                    empContact.PerVillage,
                    empContact.PersonName,
                    empContact.PersonContact,
                    empContact.PersonAddress,
                    empContact.CompanyID,
                    empContact.Relationship,
                    empContact.PreCountry,
                    empContact.PerCountry,
                    empContact.PrePostCode,
                    empContact.PerPostCode,
                    empContact.MailingAddress,
                    empContact.SecondaryMobile,
                    empContact.SecandaryMail,
                    empContact.SocialURL1,
                    empContact.SocialURL2,
                    empContact.EmergrncyPostCode,
                    empContact.EmergrncyPostCountry
                };
                int rowAffect = con.Execute("sp_EmpContactInfo_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static EmpContactInfoViewModel GetEmpContactInfo(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                EmpContactInfoViewModel empContact = con.Query<EmpContactInfoViewModel>("SELECT * FROM view_emp_contact_info WHERE CompanyID=" + compId + " AND EmpCode='" + empCode + "'").ToList().FirstOrDefault();
                return empContact;
            }
        }

        //Family Info
        public static bool SaveEmpFamilyInfo(EmpFamilyInfoModel empFamily)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empFamily.EmpCode,
                    empFamily.PersonName,
                    empFamily.DOB,
                   POB=empFamily.DistrictName,
                    empFamily.BloodGroup,
                    empFamily.Relationship,
                    empFamily.Gender,
                    empFamily.MaritalStatus,
                    empFamily.ContactNo,
                    empFamily.Email,
                    empFamily.Nationality,
                    empFamily.IsNominee,
                    empFamily.Percentage,
                    empFamily.Occupation,
                    empFamily.PassportNo,
                    empFamily.NationalID,
                    empFamily.CompanyID,
                    empFamily.Photo,
                    empFamily.Signature
                };
                int rowAffect = con.Execute("sp_EmpFamilyInfo_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;

            }
        }
        public static bool UpdateEmpFamilyInfo(EmpFamilyInfoModel empFamily)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empFamily.ID,
                    empFamily.EmpCode,
                    empFamily.PersonName,
                    empFamily.DOB,
                    empFamily.POB,
                    empFamily.BloodGroup,
                    empFamily.Relationship,
                    empFamily.Gender,
                    empFamily.MaritalStatus,
                    empFamily.ContactNo,
                    empFamily.Email,
                    empFamily.Nationality,
                    empFamily.IsNominee,
                    empFamily.Percentage,
                    empFamily.Occupation,
                    empFamily.PassportNo,
                    empFamily.NationalID,
                    empFamily.CompanyID,
                    empFamily.Photo,
                    empFamily.Signature
                };
                int rowAffect = con.Execute("sp_EmpFamilyInfo_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<EmpFamilyInfoViewModel> GetEmpFamilyInfo(int companyId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    CompanyID = companyId,
                    EmpCode = empCode
                };
                List<EmpFamilyInfoViewModel> familyMember = con.Query<EmpFamilyInfoViewModel>("sp_EmpFamilyInfo_List", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return familyMember;
            }
        }
        public static EmpFamilyInfoModel GetFamilyMember(int personId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                EmpFamilyInfoModel person = con.QuerySingle<EmpFamilyInfoModel>("SELECT * FROM EmpFamilyInfo WHERE ID = " + personId);
                return person;
            }
        }
        public static bool DeleteEmpFamily(int personId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE EmpFamilyInfo WHERE ID=" + personId);
                return rowAffect > 0;
            }
        }

        //Reference Info
        public static bool SaveEmpRef(EmpReferenceModel empRef)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empRef.EmpCode,
                    empRef.Name,
                    empRef.Organization,
                    empRef.Designation,
                    empRef.Relationship,
                    empRef.Address,
                    empRef.Mobile,
                    empRef.Email,
                    empRef.CompanyID
                };
                int rowAffect = con.Execute("sp_EmployeeReference_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEmpRef(EmpReferenceModel empRef)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empRef.Id,
                    empRef.EmpCode,
                    empRef.Name,
                    empRef.Organization,
                    empRef.Designation,
                    empRef.Relationship,

                    empRef.Address,
                    empRef.Mobile,
                    empRef.Email,
                    empRef.CompanyID

                };
                int rowAffect = con.Execute("sp_EmployeeReference_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<EmpReferenceModel> GetEmpReferences(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var references = con.Query<EmpReferenceModel>("SELECT * FROM RefferenceInformation WHERE CompanyID='" + compId + "' AND EmpCode='" + empCode + "'").ToList();
                return references;
            }
        }
        public static EmpReferenceModel GetEmpReference(int referenceId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var reference = con.QuerySingle<EmpReferenceModel>("SELECT * FROM RefferenceInformation WHERE Id=" + referenceId);
                return reference;

            }
        }
        public static bool DeleteEmpRef(int referenceId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var rowAffect = con.Execute("DELETE RefferenceInformation WHERE Id = " + referenceId);
                return rowAffect > 0;
            }
        }

        //Education Info
        public static bool SaveEmpEducation(EmpEducationInfoModel empEdu)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empEdu.EmpCode,
                    empEdu.Name,
                    empEdu.Levelof,
                    empEdu.Institute,
                    empEdu.Pasyear,
                    empEdu.Marks,
                    empEdu.Duration,
                    empEdu.Subject,
                    empEdu.Result,
                    empEdu.Achivement,
                    empEdu.CompanyID,
                    empEdu.EducationBoard,
                    empEdu.Country
                };
                int rowAffect = con.Execute("sp_Education_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEmpEducation(EmpEducationInfoModel empEdu)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empEdu.ID,
                    empEdu.EmpCode,
                    empEdu.Name,
                    empEdu.Levelof,
                    empEdu.Institute,
                    empEdu.Pasyear,
                    empEdu.Marks,
                    empEdu.Duration,
                    empEdu.Subject,
                    empEdu.Result,
                    empEdu.Achivement,
                    empEdu.CompanyID,
                    empEdu.EducationBoard,
                    empEdu.Country
                };
                int rowAffect = con.Execute("sp_Education_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<EmpEducationViewModel> GetEmpEducation(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    EmpCode = empCode
                };
                var educations = con.Query<EmpEducationViewModel>("sp_Education_List", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return educations;

            }
        }
        public static EmpEducationViewModel GetEmpEducation(int empEduId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var education = con.QuerySingle<EmpEducationViewModel>("SELECT * FROM EmpEducationalInfo WHERE ID=" + empEduId);
                return education;
            }
        }
        public static bool DeleteEmpEdu(int empEduId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE EmpEducationalInfo WHERE ID=" + empEduId);
                return rowAffect > 0;
            }
        }


        //Experience Info
        public static bool SaveEmpExperience(EmpExperienceModel empExp)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empExp.EmpCode,
                    empExp.Organization,
                    empExp.Address,
                    empExp.JoinDate,
                    empExp.EndDate,
                    empExp.YearOfExperience,
                    empExp.Position,
                    empExp.PhoneNo,
                    empExp.JobDescription,
                    empExp.SupervisorName,
                    empExp.SupervisorMobileNo,
                    empExp.CompanyID,
                    empExp.CountryID,
                    empExp.ExprienceType
                };
                int rowAffect = con.Execute("sp_Experience_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEmpExperience(EmpExperienceModel empExp)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    ID = empExp.Id,
                    empExp.EmpCode,
                    empExp.Organization,
                    empExp.Address,
                    empExp.JoinDate,
                    empExp.EndDate,
                    empExp.YearOfExperience,
                    empExp.Position,
                    empExp.PhoneNo,
                    empExp.JobDescription,
                    empExp.SupervisorName,
                    empExp.SupervisorMobileNo,
                    empExp.CompanyID,
                    empExp.CountryID,
                    empExp.ExprienceType
                };
                int rowAffect = con.Execute("sp_Experience_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<EmpExperienceModel> GetEmpAllExperience(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var experiences = con.Query<EmpExperienceModel>("SELECT * FROM EmpExperience WHERE CompanyID=" + compId + " AND EmpCode='" + empCode + "'").ToList();
                return experiences;
            }
        }
        public static EmpExperienceModel GetEmpExperinece(int experienceId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var experience = con.QuerySingle<EmpExperienceModel>("SELECT * FROM EmpExperience WHERE Id=" + experienceId);
                return experience;
            }
        }
        public static bool DeleteEmpExperience(int experienceId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE EmpExperience WHERE Id =" + experienceId);
                return rowAffect > 0;
            }
        }

        //Qualification Info
        public static bool SaveUpdateDeleteEmpQualification(EmpQualificationModel eQ,int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    eQ.ID,
                    eQ.EmpCode,
                    eQ.Certification,
                    eQ.Institute,
                    eQ.Location,
                    eQ.CountryID,
                    eQ.FromDate,
                    eQ.ToDate,
                    eQ.Duration,
                    eQ.Achievement,
                    eQ.CompanyID,
                    eQ.Msg,
                    pOptions
                };
                int rowAffect = con.Execute("sp_EmpQualification_New", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<EmpQualificationModel> getAllEmpqualification(EmpQualificationModel eQ, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    eQ.ID,
                    eQ.EmpCode,
                    eQ.Certification,
                    eQ.Institute,
                    eQ.Location,
                    eQ.CountryID,
                    eQ.FromDate,
                    eQ.ToDate,
                    eQ.Duration,
                    eQ.Achievement,
                    eQ.CompanyID,
                    eQ.Msg,
                    pOptions
                };
                List<EmpQualificationModel> empProQualification = con.Query<EmpQualificationModel>("sp_EmpQualification_New", param: paramOb, commandType: CommandType.StoredProcedure).ToList();
                return empProQualification;
            }

        }

        public static EmpQualificationModel getEmpqualificationbyID(EmpQualificationModel eQ, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    eQ.ID,
                    eQ.EmpCode,
                    eQ.Certification,
                    eQ.Institute,
                    eQ.Location,
                    eQ.CountryID,
                    eQ.FromDate,
                    eQ.ToDate,
                    eQ.Duration,
                    eQ.Achievement,
                    eQ.CompanyID,
                    eQ.Msg,
                    pOptions
                };
                EmpQualificationModel empProQualification = con.QuerySingle<EmpQualificationModel>("sp_EmpQualification_New", param: paramOb, commandType: CommandType.StoredProcedure);
                return empProQualification;
            }

        }
        //Publication Info
        public static bool SaveEmpPublication(EmpPublicationModel eP)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    eP.EmpCode,
                    eP.PublicationTitle,
                    eP.WherePublished,
                    eP.SingleMultiple,
                    eP.LocalOrIntl,
                    eP.Contribution,
                    eP.Remarks,
                    eP.PublicationDate,
                    eP.CompanyID,
                    eP.PublicationType,
                    eP.URL,
                    eP.Photo,
                    eP.Numberofauthor,
                    eP.DesignationId
                };
                int rowAffect = con.Execute("sp_Publication_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

  
        public static bool UpdateEmpPublication(EmpPublicationModel eP)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    eP.ID,
                    eP.EmpCode,
                    eP.PublicationTitle,
                    eP.WherePublished,
                    eP.SingleMultiple,
                    eP.LocalOrIntl,
                    eP.Contribution,
                    eP.Remarks,
                    eP.PublicationDate,
                    eP.CompanyID,
                    eP.PublicationType,
                    eP.URL,
                    eP.Photo,
                    eP.Numberofauthor,
                    eP.DesignationId
                };
                int rowAffect = con.Execute("sp_Publication_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<EmpPublicationModel> getAllEmpPublication(int companyId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = string.Format(@"SELECT  dbo.EmpPublication.ID, dbo.EmpPublication.EmpCode, dbo.EmpPublication.PublicationTitle, dbo.EmpPublication.WherePublished, dbo.EmpPublication.SingleMultiple, 
                      dbo.EmpPublication.LocalOrIntl, dbo.EmpPublication.Contribution, dbo.EmpPublication.Remarks, dbo.EmpPublication.PublicationDate, 
                      dbo.EmpPublication.CompanyID, dbo.EmpPublication.PublicationType, dbo.EmpPublication.URL, dbo.EmpPublication.Photo, dbo.EmpPublication.Numberofauthor, 
                      dbo.EmpPublication.DesignationId, dbo.DesignationPublication.Description
                      FROM dbo.EmpPublication INNER JOIN
                      dbo.DesignationPublication ON dbo.EmpPublication.DesignationId = dbo.DesignationPublication.ID WHERE dbo.EmpPublication.CompanyID = {0} AND dbo.EmpPublication.EmpCode = '{1}'", companyId, empCode);
                List<EmpPublicationModel> emppublication = con.Query<EmpPublicationModel>(sql).ToList();
                return emppublication;
            }

        }

        public static List<EmpPublicationModel> getAllChildPublication(int companyId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = string.Format(@"SELECT dbo.EmpPublication.CompanyID, dbo.DesignationPublication.Description, SUM(dbo.EmpPublication.Contribution) AS Contribution
                                            FROM dbo.EmpPublication INNER JOIN
                      dbo.DesignationPublication ON dbo.EmpPublication.DesignationId = dbo.DesignationPublication.ID
                            GROUP BY dbo.EmpPublication.CompanyID,dbo.EmpPublication.EmpCode, dbo.DesignationPublication.Description  having dbo.EmpPublication.CompanyID = {0} AND dbo.EmpPublication.EmpCode = '{1}'", companyId, empCode);
                List<EmpPublicationModel> childpublication = con.Query<EmpPublicationModel>(sql).ToList();
                return childpublication;
            }
        }



        /// /////////// Emp Scholarship ////////////
        public static bool SaveUpdateDeleteEmpScholarship(EmpScholarshipModel eS,int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    eS.ID,
                    eS.EmpCode,
                    eS.NameofScholarship,
                    eS.Institute,
                    eS.Duration,
                    eS.Country,
                    eS.Achievment,
                    eS.AchievmentDate,
                    eS.Remark,
                    eS.UserID,
                    eS.CompanyID,
                    eS.Msg,
                    pOptions
                };
                int rowAffect = con.Execute("sp_Scholarship_New", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static List<EmpScholarshipModel> getAllEmpScholarship(EmpScholarshipModel eS, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    eS.ID,
                    eS.EmpCode,
                    eS.NameofScholarship,
                    eS.Institute,
                    eS.Duration,
                    eS.Country,
                    eS.Achievment,
                    eS.AchievmentDate,
                    eS.Remark,
                    eS.UserID,
                    eS.CompanyID,
                    eS.Msg,
                    pOptions
                };
                List<EmpScholarshipModel> empScholarship = con.Query<EmpScholarshipModel>("sp_Scholarship_New", param: paramOb, commandType: CommandType.StoredProcedure).ToList();
                return empScholarship;
            }

        }

        //Training Info
        public static List<EmpTrainingInfoVM> getAllEmpTrainingInfo(int companyID,string empCode)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    CompanyID = companyID,
                    EmpCode = empCode
                };
                List<EmpTrainingInfoVM> empTraining = con.Query<EmpTrainingInfoVM>("sp_EmpTraining_List", param:paramOb,commandType:CommandType.StoredProcedure).ToList();
                return empTraining;
            }

        }
        public static EmpTrainingModel GetEmpTraining(int Id)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var emptraining = con.QuerySingle<EmpTrainingModel>("SELECT * FROM EmpTraining WHERE ID=" + Id);
                return emptraining;
            }
        }

        public static bool SaveEmpTraining(EmpTrainingModel eT)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
               
                var paramObj = new
                {
                    eT.EmpCode,
                    eT.TrainingType,
                    eT.TrainingName,
                    eT.TrainingNature,
                    eT.Description,
                    eT.Institution,
                    eT.TrainingPlace,
                    eT.Country,
                    eT.Achievement,
                    eT.SponsorType,
                    eT.TrainingFees,
                    eT.OtherCost,
                    eT.FromDate,
                    eT.ToDate,
                    eT.CompanyID
                };
                int rowAffect = con.Execute("sp_EmpTraining_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEmpTraining(EmpTrainingModel eT)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    eT.ID,
                    eT.EmpCode,
                    eT.TrainingType,
                    eT.TrainingName,
                    eT.TrainingNature,
                    eT.Description,
                    eT.Institution,
                    eT.TrainingPlace,
                    eT.Country,
                    eT.Achievement,
                    eT.SponsorType,
                    eT.TrainingFees,
                    eT.OtherCost,
                    eT.FromDate,
                    eT.ToDate,
                    eT.CompanyID
                };
                int rowAffect = con.Execute("sp_EmpTraining_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool DeleteEmpTraining(int trainingId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = con.Execute("DELETE EmpTraining WHERE Id =" + trainingId);
                return rowAffect > 0;
            }
        }

        /// ///// /////  ///////Employee Award Info////////////

        public static bool SaveUpdateDeleteEmpAward(EmpAwardModel empAward, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    empAward.ID,
                    empAward.EmpCode,
                    empAward.AwardTitle,
                    empAward.Institute,
                    empAward.Location,
                    empAward.CountryID,
                    empAward.AwardDate,
                    empAward.Description,
                    empAward.CompanyID,
                    empAward.Msg,
                    pOptions
                };
                int rowAffect = con.Execute("sp_EmpAward_New", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<EmpAwardModel> getAllEmpAward(EmpAwardModel empAward, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    empAward.ID,
                    empAward.EmpCode,
                    empAward.AwardTitle,
                    empAward.Institute,
                    empAward.Location,
                    empAward.CountryID,
                    empAward.AwardDate,
                    empAward.Description,
                    empAward.CompanyID,
                    empAward.Msg,
                    pOptions
                };
                List<EmpAwardModel> empaward = con.Query<EmpAwardModel>("sp_EmpAward_New", param: paramOb, commandType: CommandType.StoredProcedure).ToList();
                return empaward;
            }

        }

        public static EmpAwardModel getEmpAwardbyID(EmpAwardModel empAward, int pOptions)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramOb = new
                {
                    empAward.ID,
                    empAward.EmpCode,
                    empAward.AwardTitle,
                    empAward.Institute,
                    empAward.Location,
                    empAward.CountryID,
                    empAward.AwardDate,
                    empAward.Description,
                    empAward.CompanyID,
                    empAward.Msg,
                    pOptions
                };
                EmpAwardModel empaward = con.QuerySingle<EmpAwardModel>("sp_EmpAward_New", param: paramOb, commandType: CommandType.StoredProcedure);
                return empaward;
            }

        }


        //Employment Info
        public static bool SaveEmployment(EmpEmploymentModel emp)
        {
            using (var con = new SqlConnection())
            {
                var paramObj = new
                {
                    emp.EmpCode,
                    emp.CompanyID,
                    emp.BusinessNatureID,
                    emp.DesignationID,
                    emp.JoinDate,
                    emp.JobType,
                    emp.EmpGradeID,
                    emp.JobDescription,
                    emp.JobLocation,
                    emp.ProjectID,
                    emp.DepartmentID,
                    emp.ConfirmationDate,
                    emp.ConfirmationDueDate,
                    emp.CardNo,
                    emp.Experience,
                    emp.Resident,
                    emp.IsComCar,
                    emp.Status,
                    emp.Location,
                    emp.Unit,
                    emp.ReportTo,
                    emp.OT
                };
                int rowAffect = con.Execute("sp_EmploymentInfo_Insert", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool UpadateEmployment(EmpEmploymentModel emp)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    emp.EmpCode,
                    emp.CompanyID,
                    emp.BusinessNatureID,
                    emp.DesignationID,
                    emp.JoinDate,
                    emp.JobType,
                    emp.EmpGradeID,
                    emp.JobDescription,
                    emp.JobLocation,
                    emp.ProjectID,
                    emp.DepartmentID,
                    emp.ConfirmationDate,
                    emp.ConfirmationDueDate,
                    emp.CardNo,
                    emp.Experience,
                    emp.Location,
                    emp.Unit,
                    emp.ReportTo,
                    emp.OT
                };
                int rowAffect = con.Execute("sp_EmploymentInfo_Update", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        //Additional Duty Info
        public static bool SaveAdditionalDuty(EmpAdditionalDutyModel eAD)
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    eAD.ID,
                    eAD.EmpCode,
                    eAD.PayType,
                    eAD.Department,
                    eAD.Designation,
                    eAD.SchoolorOffice,
                    eAD.Responsibilities,
                    eAD.NoticeIssuedDate,
                    eAD.EffFromDate,
                    eAD.EffToDate,
                    eAD.Duration,
                    eAD.Amount,
                    eAD.Remark,
                    eAD.CompanyID,
                    eAD.UserID,
                    eAD.Msg,
                    eAD.pOptions
                };
                int rowAffect = con.Execute("sp_AdditionalDuties_New", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }
        public static bool EmpTransfer(EmpTransferModel et)
        {
            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    et.EmpCode,
                    et.PreCompanyID,
                    et.PreDepartmentID,
                    et.PreProjectID,
                    et.PreDesignationID,
                    et.PreDivisionID,
                    et.PreBranchID,
                    et.PreUnit,
                    et.PreLocation,
                    et.PreGrade,
                    et.PrePayscaleGrade,
                    et.PasCompanyID,
                    et.PasDepartmentID,
                    et.PasProjectID,
                    et.PasDesignationID,
                    et.PasDivisionID,
                    et.PasBranchID,
                    et.PasUnit,
                    et.PasLocation,
                    et.PasGrade,
                    et.PasPayscaleGrade,
                    et.Note,
                    et.TransferDate,
                    et.TPType,
                    et.CompanyID,
                    et.jobresponsibilities
                };
                int rowAffect = con.Execute("sp_EmpTransfer_Save", param: paramObj, commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        //Report
        public static EmployeeViewModel GetEmpDetails(string empCode, int companyId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    EmpCode = empCode,
                    CompanyID = companyId
                };
                var employee = con.QuerySingle<EmployeeViewModel>("sp_getEmpDetaailsInfoForReport", param: paramObj, commandType: CommandType.StoredProcedure);
                return employee;
            }
        }
        //Search Employee
        public static List<EmpSearchViewModel> SearchEmployee(EmpSearchViewModel serachKeys)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    serachKeys.CompanyID,
                    serachKeys.GradeValue,
                    serachKeys.EmpName,
                    serachKeys.EmpCode,
                    serachKeys.Department,
                    serachKeys.Designation,
                    serachKeys.IsBlock,
                    serachKeys.Status
                };
                List<EmpSearchViewModel> employees = con.Query<EmpSearchViewModel>("sp_search_employee", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return employees;
            }
        }
        

        public static List<EmpSearchViewModel> GetEmpByBoss(string empCode, int companyId=1)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var param = new { empCode };
            List<EmpSearchViewModel> empList = con.Query<EmpSearchViewModel>("GetBossWiseEmployeeApp", param, commandType: CommandType.StoredProcedure).ToList();
            foreach(var emp in empList){
                emp.Designation = Employment.GetEmployment(emp.EmpCode, companyId).Designation;
            }
            return empList;
        }
        public static List<EmpSearchViewModel> allEmployeeGenInfo(int GradeValue)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var query = $"SELECT EmpCode,CONVERT(int, EmpCode) AS Code  FROM EmpGeneralInfo Egi WHERE  Active=1 and EmpCode<>'1' UNION SELECT EmpCode,CONVERT(int, EmpCode) AS Code FROM EmpGeneralInfo WHERE  Active=1 and EmpCode<>'1' \r\nORDER BY Code";
            List<EmpSearchViewModel> employees = con.Query<EmpSearchViewModel>(query).ToList();
            return employees;
        }
        public static List<EmpSearchViewModel> allBlockEmployeeInfo(int GradeValue)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            //var query = $"SELECT EmpCode  FROM EmpGeneralInfo Egi";
            var query = $"SELECT EmpCode, EmpName, Designation, Department, OfficeBranch, IsBlock FROM  dbo.EmployeeInfo WHERE IsBlock = N'Yes'";
            List<EmpSearchViewModel> employees = con.Query<EmpSearchViewModel>(query).ToList();
            return employees;
        }
        public static List<EmpSearchViewModel> BlockEmployee(int GradeValue)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var query = $"SELECT EmpCode  FROM EmpGeneralInfo where EmpCode<>'1' ";
            List<EmpSearchViewModel> employees = con.Query<EmpSearchViewModel>(query).ToList();
            return employees;
        }


        public static List<EmpSearchViewModel> allEmployeesForSalaryReport(int GradeValue)
        {
            var con = new SqlConnection(Connection.ConnectionString());
            var query = $"SELECT EmpCode  FROM EmpGeneralInfo where EmpCode<>'1'";
            List<EmpSearchViewModel> employees = con.Query<EmpSearchViewModel>(query).ToList();
            return employees;
        }



   

    

        public static EmpSearchViewModel GetAllLateComer(int compId, string cDate)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    strDate = cDate

                };
                EmpSearchViewModel lates = con.QuerySingle<EmpSearchViewModel>("spRptFotPieChart", param: paramObj, commandType: CommandType.StoredProcedure);
                return lates;
            }

        }

        public static EmpSearchViewModel GetAllEmployeeCount(int compId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var query = $"SELECT   COUNT(id) AS Id FROM EmpGeneralInfo where CompanyID={compId} And Active=1";
                var data = con.QuerySingle<EmpSearchViewModel>(query);
                return data;
            };
        }

        public static EmpSearchViewModel GetAllLeaveCount(string laveDate)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    LSDate = laveDate

                };
                EmpSearchViewModel leave = con.QuerySingle<EmpSearchViewModel>("sp_getTotalLeaveToday", param: paramObj, commandType: CommandType.StoredProcedure);
                return leave;
            }

            //{

            //    var query = $"SELECT  COUNT(LeaveID) AS leaveNumber FROM LeaveDetails WHERE LeaveDate  = '" + laveDate + "'";
            //    EmpSearchViewModel data = con.QuerySingle<EmpSearchViewModel>(query);
            //    return data;
            //};
        }

        public static EmpSearchViewModel GetAllAbsentCount(int compId, string cDate)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    startdate = cDate

                };
                EmpSearchViewModel absent = con.QuerySingle<EmpSearchViewModel>("spRptMissingPunchDashBoard", param: paramObj, commandType: CommandType.StoredProcedure);
                return absent;
            }

        }

        public static EmpSearchViewModel GetAllEmpHistory(int compId,string cDate)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = compId,
                    strDate = cDate

                };
                EmpSearchViewModel EmpHis = con.QuerySingle<EmpSearchViewModel>("spRptFotPieChart", param: paramObj, commandType: CommandType.StoredProcedure);
                return EmpHis;
            }

        }
        public static List<EmpDetailsViewModel> GetAllEmpDetailsToday(EmpDetailsModel empDetail)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompId = empDetail.CompId,
                    CurrentDate = empDetail.CurrentDate,
                    Type = empDetail.Type,
                    ProjectID = empDetail.ProjectID ?? -1,
                    JobLocation = empDetail.JobLocation ?? -1,
                    DepartmentID = empDetail.DepartmentID ?? -1

                };
                List<EmpDetailsViewModel> details = con.Query<EmpDetailsViewModel>("GetAllDetailsToday", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return details;
            }

        }
        public static EmpSearchViewModel GetEmpByProject(EmpDetailsModel empDetail)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CompanyID = empDetail.CompId,
                    strDate = empDetail.CurrentDate,
                    ProjectID = empDetail.ProjectID ?? -1,
                    BranchID = empDetail.JobLocation ?? -1,
                    DepartmentID = empDetail.DepartmentID ?? -1,
                    RepCode = empDetail.RepCode ?? -1

                };
                EmpSearchViewModel lates = con.QuerySingle<EmpSearchViewModel>("spRptFotPieChartForProject", param: paramObj, commandType: CommandType.StoredProcedure);
                return lates;
            }

        }


        public static List<ReportingBossModel> GetReportingBoss(int compId, string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
           
                    EmpCode = empCode,
                    CompanyID = compId

                };
                List<ReportingBossModel> report = con.Query<ReportingBossModel>("GetReportingBoss", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return report;
            }

        }


        public static List<EmpDetailsReportingModel> EmpDetailsByReportingBoss(string currentDate,string reportingBoss)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {
                    CurrentDate = currentDate,
                    ReportingBoss= reportingBoss

                };
                List<EmpDetailsReportingModel> details = con.Query<EmpDetailsReportingModel>("spDashBoard", param: paramObj, commandType: CommandType.StoredProcedure,commandTimeout:160000).ToList();
                return details;
            }

        }     
        
        
        public static List<EmpDetailsReportingModel> EmpDetailsBySupervisor(string currentDate,string reportingBoss)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                object paramObj = new
                {

                    CurrentDate = currentDate,
                    ReportingBoss= reportingBoss


                };
                List<EmpDetailsReportingModel> details = con.Query<EmpDetailsReportingModel>("spDashBoardSupervisor", param: paramObj, commandType: CommandType.StoredProcedure).ToList();
                return details;
            }

        }

    }
}
