using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
//using System.Web.Mvc;
using Dapper.Framework;
using HRMS.Models;
using HRMS.Models.ShiftAllowance;
using HRMS.ViewModels.ShiftAllowance;

namespace HRMS.DbContext.ShiftAllowance
{
    public class AssignShiftAllowance
    {
       
        public static bool saveTry(AssignShiftAllowanceModel assignShift)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    try
                    {
                        if (assignShift.SelectedEmp != null)
                        {
                            foreach (var empCode in assignShift.SelectedEmp)
                            {

                                object paramObj = new
                                {
                                    ActiveType=assignShift.ActiveType=1,
                                    assignShift.CompanyID,
                                    CreateUser=assignShift.CreateUser??-1,
                                    empCode


                                };
                                con.Execute("sp_ShiftAllowanceAssain_Insert", param: paramObj, transaction: tran, commandType: CommandType.StoredProcedure);
                            }
                            
                        }
                        tran.Commit();
                        return true;
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw new Exception(err.Message);
                    }
                }
            }
        }


        public static List<ShiftAllowanceAssignView> GetAllAssignAllowance(FilterModel filterModel)
        {
            using (var con=new SqlConnection(Connection.ConnectionString()))
            {
                int Grade;
                if (filterModel.UserTypeID != 1 && filterModel.UserTypeID != 4)
                {
                    Grade = filterModel.GradeValue??-1;
                }
                else
                {
                    Grade = -1;
                }
                var paramObj = new
                {
                   filterModel.CompanyID,
                   GradeValue=Grade,
                   filterModel.DepartmentID,
                   filterModel.DesignationID,
                   filterModel.Location,
                   filterModel.BranchID,
                   filterModel.EmpCode,
                   filterModel.Unite,
                   filterModel.Line

                };
                List<ShiftAllowanceAssignView> assingShiftAllowance =
                    con.Query<ShiftAllowanceAssignView>("sp_getShiftAllowanceAssain", paramObj,
                        commandType: CommandType.StoredProcedure).ToList();
                return assingShiftAllowance;
            }
        }
        
     
     
    }
}


