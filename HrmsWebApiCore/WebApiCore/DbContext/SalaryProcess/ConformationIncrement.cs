using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Helper;
using WebApiCore.Models.HR.Employee;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class ConformationIncrement
    {
        public List<ConformationIncrementModel> GetConorIncList(string empCode, int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                EmpCode = empCode,
                CompanyID = comid
            };
            List<ConformationIncrementModel> confirList = conn.Query<ConformationIncrementModel>("sp_GetConformation", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return confirList;
        }
        // public static ConformationIncrementModel GetConorIncList(string empCode, int comid)
        //{
        //    var conn = new SqlConnection(Connection.ConnectionString());
        //var obj = new
        //{
        //    EmpCode = empCode,
        //    CompanyID = comid
        //};
        //    ConformationIncrementModel confirList = conn.QuerySingle<ConformationIncrementModel>("sp_GetConformation", param: obj, commandType: CommandType.StoredProcedure);
        //    return confirList;
        //}

        public List<ConformIncTypeModel> GetIncrementType()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = "SELECT * FROM ConformIncType ";
            List<ConformIncTypeModel> confirList = conn.Query<ConformIncTypeModel>(quire).ToList();
            return confirList;
        }
        
        public bool SaveConfirmIncrement(List<ConformationIncrementModel> incrementModel)
        {

            using (SqlConnection con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (SqlTransaction tran = con.BeginTransaction())
                {
                    try
                    {
                        foreach (var model in incrementModel)
                        {
                            if (model.PrePayscaleID == model.IncrementPacyscaleID)
                            {
                                continue;
                            }
                            string YearJ = model.Date.Year.ToString();
                            string MonthJ = model.Date.Month.ToString();
                            string dayJ = model.Date.Day.ToString();
                            string ConFirDate = dayJ + "/" + MonthJ + "/" + YearJ;
                            var obj = new
                            {
                                model.EmpCode,
                                model.Type,
                                model.Date.Date,
                                model.PrePayscaleID,
                                model.IncrementPacyscaleID,
                                model.CompanyID,
                                model.ProvidentFund,
                                conformationDate = model.Date.ToString("MM/dd/yyyy")
                            };
                            con.Execute("INSertConformationIncrementInfo", param: obj, transaction: tran, commandType: CommandType.StoredProcedure);
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception)
                    {
                        tran.Rollback();
                        return false;
                    }
                }
            }
        }

        public bool DeleteConfirmIncrement(int id, int comid)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE ConformationIncrement WHERE ID='{id}' and CompanyID='{comid}'";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }
    }
}
