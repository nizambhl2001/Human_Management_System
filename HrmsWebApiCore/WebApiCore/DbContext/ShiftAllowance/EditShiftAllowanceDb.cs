using Dapper.Framework;
using HRMS.Models;
using HRMS.Models.ShiftAllowance;
using HRMS.ViewModels.ShiftAllowance;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.DbContext.ShiftAllowance
{
    public class EditShiftAllowanceDb
    {
        public static List<ShiftAllowanceAssignView> GetAllEditShiftAllowance(FilterModel filterModel)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (filterModel.UserTypeID != 1 && filterModel.UserTypeID != 4)
                {
                    Grade = filterModel.GradeValue ?? -1;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                    filterModel.CompanyID,
                    GradeValue= Grade,
                    filterModel.DepartmentID,
                    filterModel.DesignationID,
                    filterModel.Location,
                    filterModel.BranchID,
                    filterModel.EmpCode,
                    filterModel.Unite,
                    filterModel.Line

                };
                List<ShiftAllowanceAssignView> editshift =
                    con.Query<ShiftAllowanceAssignView>("sp_getShiftAllowanceAssainUpdate", paramObj,
                        commandType: CommandType.StoredProcedure).ToList();
                return editshift;
            }
        }
        public static bool Delete(int id)
        {
            using (var conn = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffect = conn.Execute("DELETE  ShiftAllowanceAssain WHERE ID = " + id);
                return rowAffect > 0;
            }
        }
        public static bool UpdateEditAllowance(AssignShiftAllowanceModel editshift)
        {
            if (editshift.ActiveType == 1)
            {

                editshift.ActiveType = 0;

            }
            string sql = "update ShiftAllowanceAssain set ActiveType=" + editshift.ActiveType + " where ID=" + editshift.ID+ " AND CompanyID="+editshift.CompanyID ;
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                int rowAffected = con.Execute(sql);
                return rowAffected > 0;
            }
        }
    }
}
