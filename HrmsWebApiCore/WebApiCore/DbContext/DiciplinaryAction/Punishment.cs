using Dapper.Framework;
using HRMS.Models.DiciplinaryAction;
using HRMS.ViewModels.DisciplinaryAction;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HRMS.DbContext.DiciplinaryAction
{
    public class Punishment
    {
        public static bool saveUpdatePunishment(PunishmentModel  punishmentModel)
        {
            
            var con = new SqlConnection(Connection.ConnectionString());
            var punishmentob = new
            {
                punishmentModel.ID,
                punishmentModel.EmpCode,
                punishmentModel.DateOfLetterIssue,
                punishmentModel.NatureOfPunishmentID,
                punishmentModel.ActionID,
                punishmentModel.StartDate,
                punishmentModel.EndDate,
                punishmentModel.sDays,
                punishmentModel.UserID,
                punishmentModel.CompanyID,

            };

            int rowAffected = con.Execute("sp_Punishment", param: punishmentob, commandType: CommandType.StoredProcedure);
            return rowAffected > 0;
        }

        public static List<PunishmentViewModel> getAllPunishmentList(string empCode, int gradeValue, int comId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var paramObj = new
            {
                EmpCode= empCode,
                GradeValue=gradeValue,
                CompanyID = comId
            };
            List<PunishmentViewModel> punishmentList = conn.Query<PunishmentViewModel>("sp_EmpPunishment_List",param:paramObj,commandType:CommandType.StoredProcedure).ToList();
            return punishmentList;
        }


        public static PunishmentModel getByid(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            PunishmentModel punishment = conn.QuerySingle<PunishmentModel>("SELECT * FROM Punishment WHERE ID=" + id);
            return punishment;
        }
    }



}