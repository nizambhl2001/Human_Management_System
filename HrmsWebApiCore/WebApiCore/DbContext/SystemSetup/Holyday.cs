using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SystemSetup;

namespace WebApiCore.DbContext.SystemSetup
{
    public class Holyday
    {
        public static int GetNumOfHolyday(string fromDate, string toDate, int grade)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                int numOfHolyDay = con.ExecuteScalar<int>("sp_HolyDay_Count", param: new {startdate=fromDate, EndDate=toDate, Grade=grade }, commandType:System.Data.CommandType.StoredProcedure);
                return numOfHolyDay;
            }
        }

        public static List<HolydayModel> getHolydayList(DateTime dateParam)
        {
            string year = dateParam.Year.ToString();
            string month = dateParam.Month.ToString();
            if (month.Length < 2)
            {
                month = "0" + month;
            }
            string YM= year+month;
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                List<HolydayModel> result = con.Query<HolydayModel>("sp_getDayOFMonth", param: new { Hdate = YM }, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }

        public static bool saveHolyday(HolydayModel holydayModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            using (var tran = conn.BeginTransaction())
            {
                try
                {
                    string quire = $"update HolidaySetup set Note=@Note where Hdate=@Hdate";
                    foreach (var item in holydayModel.CalenderArray)
                    {
                        if(item.Note != null)
                        {
                            using (var cmd = new SqlCommand())
                            {
                                cmd.CommandText = quire;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.Parameters.AddWithValue("Note", item.Note);
                                cmd.Parameters.AddWithValue("Hdate", item.Hdate);
                                cmd.ExecuteNonQuery();
                            }
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
    
}
