using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper.Framework;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class BasicEntry
    {
        /// <summary>
        /// To get All basic entry items
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="compId"></param>
        /// <returns></returns>
        public static List<BasicEntryModel> GetAllBasicItems(string tableName, int compId)
        {
            string sql = $"SELECT * FROM {tableName} WHERE CompanyID={compId}";
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<BasicEntryModel>(sql).ToList();
                return items;
            }
        }
        public static bool SaveBasicEntry(BasicEntryModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO {model.TableName} (Description,SortOrder,CompanyID) Values('{model.Description}','{model.SortOrder}','{model.CompanyID}') ";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool UpdateBasicEntry(BasicEntryModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $" UPDATE  {model.TableName} SET Description='{model.Description}', SortOrder={model.SortOrder} WHERE ID={model.ID}";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool DeleteBasicEntry(string tableName, int id,int companyID )
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE {tableName} WHERE ID='{id}' AND CompanyID='{companyID}'";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static BasicEntryModel GetByIdBasicEntry(BasicEntryModel basicEntryModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM {basicEntryModel.TableName} WHERE ID={basicEntryModel.ID}";
            BasicEntryModel result = conn.QuerySingle<BasicEntryModel>(quire);
            return result;
        }



        //get All Salary Type
        public static List<BasicEntryModel> GetAllType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Type").ToList();
            return (data);
        }

        //Bank Branch
        public static List<BasicEntryModel> GetBank()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Bank").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetBankBranch()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM BankBranch").ToList();
            return (data);
        }
       
        public static List<BasicEntryModel> GetDepartment()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Department").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetDepartmentGL()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM DepartmentGL").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetLocation()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Location").OrderBy(c => c.Description).ToList();
            return data;
        }
        public static List<BasicEntryModel> GetCountry()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Country").ToList();
            return (data);
        }
        public static List<DivisionContext> GetDivisions()
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var divisions = con.Query<DivisionContext>("SELECT * FROM ContactDivision").ToList();
                return divisions;
            }
        }
        public static List<District> GetDistricts(int divisionId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var district = con.Query<District>("SELECT * FROM ContactDistrict WHERE DivisionID=" + divisionId).ToList();
                return district;
            }
        }
        public static List<Upazila> GetUpazila(int districtId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var upazila = con.Query<Upazila>("SELECT * FROM ContactUpazila WHERE DistrictID=" + districtId).ToList();
                return upazila;
            }
        }
        public static List<Thana> GetThana(int upazilaId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var thana = con.Query<Thana>("SELECT * FROM ContactThana WHERE UpazilaID=" + upazilaId).ToList();
                return thana;
            }
        }
        public static List<BasicEntryModel> GetNationality()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Nationality").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetGender()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Gender").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetReligion()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Religion").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetBloodGroup()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM BloodGroup").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetEducationLevel()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM EducationLevel ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetEducationGroup()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM EducationGroup ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetEducationBoard()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM EducationBoard ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetInstitute()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Institute ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetResult()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Result ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetPassingYear()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM PassingYear ORDER BY Description").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetTrainingType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM TrainingType").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetTrainingCountry()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM TrainingCountry").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetTrainingInstitute()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM TrainingInstitution").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetTrainingNature()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM TrainingNature").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetTrainingSponserBy()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM TrainingSponsorType").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetProject()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Project").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetJobType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM JobType").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetDesignation()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Designation").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetOccupation()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            List<BasicEntryModel> data = conn.Query<BasicEntryModel>("SELECT * FROM Occupation").OrderBy(c => c.Description).ToList();
            return data;
        }
        public static List<BasicEntryModel> GetExperienceType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM ExperienceType").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetPunishment()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Punishment").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetBranch()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Branch").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetUnit()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM   AreaorUnit").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetSignatory(int compId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>($"SELECT * FROM Signatory WHERE CompanyID={compId} AND ISActive=1").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetMisconduct()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM ShowcauseRules").ToList();
            return data;
        }
        public static List<BasicEntryModel> GetPrefix()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Prefix").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetSuffix()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Suffix").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetPublicationType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM PublicationType").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetDesignationPublication()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM DesignationPublication").ToList();
            return (data);
        }
        public static List<BasicEntryModel> GetRelationShip()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Relationship").OrderBy(c => c.Description).ToList();
            return data;
        }

        //Organization from EmpReferenceInfo table
        public static List<BasicEntryModel> GetOrganization()
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                var organizations = con.Query<BasicEntryModel>("SELECT DISTINCT Organization as Description FROM RefferenceInformation").ToList();
                return organizations;
            }
        }



        public static List<BasicEntryModel> GetShowCauseRules()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM ShowcauseRules").OrderBy(c => c.Description).ToList();
            return data;
        }


        //------------- Get All ShowCause Result Type-----------=------

        public static List<BasicEntryModel> GetAllShowcauseResultType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM ShowcauseResultType").ToList();
            return data;
        }

        //=======================Get All ShowCauseResult Details===============
        public static List<BasicEntryModel> GetAllShowcauseResultDetails()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM ShowCauseDetails").ToList();
            return data;
        }

        //=======================Get All Action  ===============
        public static List<BasicEntryModel> getAllAction()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM Action").ToList();
            return data;
        }

        public static List<BasicEntryModel> getAllPunishmentType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var data = conn.Query<BasicEntryModel>("SELECT * FROM NatureOfPunishment").ToList();
            return data;
        }
        //--------------------------get production Unit-----------------------------------------
        public static List<BasicEntryModel> GetProductionUnit(int compId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var unit = con.Query<BasicEntryModel>("SELECT * FROM ProductionUnite WHERE CompanyID=" + compId).ToList();
                return unit;
            }

        }
        public static List<BasicEntryModel> GetProductionLine(int compId, int unitId)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {

                List<BasicEntryModel> productionLine = con.Query<BasicEntryModel>("SELECT * FROM ProductionLine WHERE FloreID=" + unitId + " And CompanyID=" + compId).ToList();
                return productionLine;
            }
        }
        public static List<BasicEntryModel> GetMaritalStatus()
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                List<BasicEntryModel> maritalStatus = con.Query<BasicEntryModel>("SELECT * FROM MaritalStatus").ToList();
                return maritalStatus;
            }
        }

        public static List<BusinessNatureModel> GetAllBusinessNature(int compId, int departmentId=-1)
        {
            string sql = $"SELECT bn.ID, bn.Description, bn.SortOrder, bn.DepartmentID, d.Description as DepartmentName, bn.CompanyID  FROM BusinessNature bn LEFT JOIN Department d ON d.ID=bn.DepartmentID WHERE bn.CompanyID={compId} AND ISNULL(bn.DepartmentID,0)= CASE WHEN {departmentId}>0 THEN {departmentId} ELSE ISNULL(bn.DepartmentID,0) END";
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var items = con.Query<BusinessNatureModel>(sql).ToList();
                return items;
            }
        }


        public static bool SaveBusinessNature(BusinessNatureModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"INSERT INTO BusinessNature (Description,SortOrder,CompanyID, DepartmentID) Values('{model.Description}','{model.SortOrder}','{model.CompanyID}', {model.DepartmentID})";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool UpdateBusinessNature(BusinessNatureModel model)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $" UPDATE  BusinessNature SET Description='{model.Description}', SortOrder={model.SortOrder}, DepartmentID={model.DepartmentID} WHERE ID={model.ID}";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static bool DeleteBusinessNature(int id, int companyID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE BusinessNature WHERE ID='{id}' AND CompanyID='{companyID}'";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }

        public static BusinessNatureModel GetByIdBusinessNature(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM BusinessNature WHERE ID={id}";
            BusinessNatureModel result = conn.QuerySingle<BusinessNatureModel>(quire);
            return result;
        }

        public static bool SaveThana(Thana thana)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string query= $"INSERT INTO ContactThana (ThanaName,UpazilaID) Values('{thana.ThanaName}',{thana.UpazilaID})";
            int rowAffected = conn.Execute(query);
            return rowAffected > 0;
        }

        public static ThanaDependencyModel GetThanaDependency(int thanaID)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string query = $"SELECT ct.ThanaID,ct.ThanaName,cu.UpazilaID,cd.DistrictID,cdv.DivisionID From ContactThana ct Inner join ContactUpazila cu On ct.UpazilaID = cu.UpazilaID Inner join ContactDistrict cd On cu.DistrictID = cd.DistrictID inner join ContactDivision cdv on cdv.DivisionID = cd.DivisionID WHERE ThanaID = {thanaID}";
            ThanaDependencyModel result = conn.QuerySingle<ThanaDependencyModel>(query);
            return result;
        }
        public static List<Thana> getAllThana()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string query = $"SELECT * FROM ContactThana";
            var items = conn.Query<Thana>(query).ToList();
            return items;
        }

    }

}
