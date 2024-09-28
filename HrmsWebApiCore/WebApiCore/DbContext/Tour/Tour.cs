using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.Tour;
using WebApiCore.ViewModels.Tour;

namespace WebApiCore.DbContext.Tour
{
    public class Tour
    {

        public static bool SaveUpdate(TourModel tour)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var param = new
            {
                tour.ID,
                tour.EmpCode,
                tour.LSDate,
                tour.LEDate,
                tour.LADate,
                tour.AccepteDuration,
                tour.UnAccepteDuration,
                tour.ReferanceEmpcode,
                tour.AppType,
                tour.YYYYMMDD,
                tour.CompanyID,
                tour.ApplyTo,
                tour.Reason,
                tour.EmgContructNo,
                tour.EmgAddress,
            };
            var rowAffect = conn.Execute("INSertupdateTourInfo", param: param, commandType: CommandType.StoredProcedure);
            return rowAffect > 0;
        }
        public static List<TourModel> getAll()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.Query<TourModel>("SELECT * FROM TourInfo").ToList();
            return dataset;
        }
        public static TourModel getById(int id)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var dataset = conn.QuerySingle<TourModel>("SELECT * FROM TourInfo WHERE ID="+id);
            return dataset;
        }
        public static List<TourApproveViewModel> TourListAction(TourApproveViewModel tour)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                tour.ID,
                tour.TourID,
                tour.ReqFrom,
                tour.ReqTo,
                tour.UserID,
                tour.Remarks,
                tour.COmpanyID,
                tour.Msg,
                tour.pOptions
            };
            var tourList = conn.Query<TourApproveViewModel>("sp_TourInfoStatus_New", param: peram, commandType: CommandType.StoredProcedure).ToList();
            return tourList;
        }
        public static bool updateStatus(TourApproveViewModel tour)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var peram = new
            {
                tour.ID,
                tour.TourID,
                tour.ReqFrom,
                tour.ReqTo,
                tour.UserID,
                tour.Remarks,
                tour.CompanyID,
                tour.Msg,
                tour.pOptions
            };
            var rowAffect = conn.Execute("sp_TourInfoStatus_New", param: peram, commandType: CommandType.StoredProcedure);
            return rowAffect>0;
        }
    }
}
