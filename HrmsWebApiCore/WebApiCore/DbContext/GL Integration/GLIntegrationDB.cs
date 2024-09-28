using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Dapper.Framework;
using Microsoft.EntityFrameworkCore;
using WebApiCore.Models.GL_Integration;
using WebApiCore.ViewModels.NewFolder;

namespace WebApiCore.DbContext.GL_Integration
{
    public class GLIntegrationDB
    {
        public static bool saveOrUpdateCostHead(CostHeadModel costhead,int Option)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    costhead.ID,
                    costhead.CostHead,
                    costhead.CompanyID,
                    costhead.CreateUser,
                    Option

                };
                int rowAffect = con.Execute("INSertGLIntegration", param: paramObj,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<CostHeadModel> getAllCostHead(CostHeadModel costhead, int Option)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    costhead.ID,
                    costhead.CostHead,
                    costhead.CompanyID,
                    costhead.CreateUser,
                    Option
                };
                List<CostHeadModel> costheadlist = con.Query<CostHeadModel>("INSertGLIntegration", param: paramObj,
                    commandType: CommandType.StoredProcedure).ToList();
                return costheadlist;
            }
        }
        ////////////////////////GLCode Setup...................

        public static bool saveOrUpdateGLCode(GLCodeModel glCode, int Option)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    glCode.ID,
                    glCode.CostID,
                    glCode.DepertmentID,
                    glCode.BranchID,
                    glCode.GLCode,
                    glCode.GlDescription,
                    UserID = glCode.UserID = 1,
                    glCode.CompanyID,
                    Option

                };
                int rowAffect = con.Execute("INSertGLCode", param: paramObj,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<GLCodeVM> getAllGLCode(GLCodeModel glCode, int Option)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    glCode.ID,
                    glCode.CostID,
                    glCode.DepertmentID,
                    glCode.BranchID,
                    glCode.GLCode,
                    glCode.GlDescription,
                    UserID= glCode.UserID=1,
                    glCode.CompanyID,
                    Option
                };
                List<GLCodeVM> glCodelist = con.Query<GLCodeVM>("INSertGLCode", param: paramObj,
                    commandType: CommandType.StoredProcedure).ToList();
                return glCodelist;
            }
        }

        public static List<CostHeadModel> getAllCostHeadForDropDown()
        {
            var con=new SqlConnection(Connection.ConnectionString());
            List<CostHeadModel> listofCosthead = con.Query<CostHeadModel>("Select * from GLCostHead").ToList();
            return listofCosthead;
        }
        //////////////////////GL Salary Head Assign/////////////////////

        public static bool saveOrUpdateGLSalaryHeadAssign(GLSalaryHeadAssignModel glsalheadAssign, int Option)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    glsalheadAssign.ID,
                    glsalheadAssign.CostHead,
                    glsalheadAssign.SalaryHead,
                    glsalheadAssign.Date,
                    glsalheadAssign.Note,
                    UserID=glsalheadAssign.UserID=1,
                    glsalheadAssign.CompanyID,
                    Option

                };
                int rowAffect = con.Execute("INSertGLSalaryHeadAssain", param: paramObj,
                    commandType: CommandType.StoredProcedure);
                return rowAffect > 0;
            }
        }

        public static List<GLSalaryHeadAssignModel> getAllGLSalaryHeadAssign(GLSalaryHeadAssignModel glsalheadAssign, int Option)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                var paramObj = new
                {
                    glsalheadAssign.ID,
                    glsalheadAssign.CostHead,
                    glsalheadAssign.SalaryHead,
                    glsalheadAssign.Date,
                    glsalheadAssign.Note,
                    UserID=glsalheadAssign.UserID = 1,
                    glsalheadAssign.CompanyID,
                    Option
                };
                List<GLSalaryHeadAssignModel> glsalheadassign = con.Query<GLSalaryHeadAssignModel>("INSertGLSalaryHeadAssain", param: paramObj,
                    commandType: CommandType.StoredProcedure).ToList();
                return glsalheadassign;
            }
        }
    }
}
