using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class SalaryStructure
    {
        public static List<StructureTypeModel> getSalaryTypeList()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM StructureType";
            List<StructureTypeModel> result = conn.Query<StructureTypeModel>(quire).ToList();
            return result;
        }

        public static List<SalaryStructureViewModel> GetSalaryStructureAddition(int structureID)
        {
            
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT  SH.SLNo,  SS.StructureID, SS.SalaryHeadID, SS.SalaryHeadType, SS.Amount, "+
                             $" SS.SalaryTypeID, SS.BasedOnID, SS.SortOrder, T.TypeName, BO.BasedOnName, "+
                             $" SH.AccountName, SH.AccountCode,SS.CompanyID FROM  SalaryStructure SS "+
                             $" INNER JOIN SalaryHead SH ON SS.SalaryHeadID = SH.ID "+
                             $" INNER JOIN Type T ON T.ID = SS.SalaryTypeID "+
                             $" INNER JOIN BasedOn BO ON BO.ID = SS.BasedOnID WHERE SS.StructureID = '{structureID}' and SS.SalaryHeadType = 1  ORDER BY SH.SLNo ";
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>(quire).ToList();
            return result;
        }

        public static List<SalaryStructureViewModel> GetSalaryStructureDeduction(int structureID)
        {

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT  SH.SLNo,  SS.StructureID, SS.SalaryHeadID, SS.SalaryHeadType, SS.Amount, " +
                             $" SS.SalaryTypeID, SS.BasedOnID, SS.SortOrder, T.TypeName, BO.BasedOnName, " +
                             $" SH.AccountName, SH.AccountCode,SS.CompanyID FROM  SalaryStructure SS " +
                             $" INNER JOIN SalaryHead SH ON SS.SalaryHeadID = SH.ID " +
                             $" INNER JOIN Type T ON T.ID = SS.SalaryTypeID " +
                             $" INNER JOIN BasedOn BO ON BO.ID = SS.BasedOnID WHERE SS.StructureID = '{structureID}' and SS.SalaryHeadType = 2  ORDER BY SH.SLNo ";
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>(quire).ToList();
            return result;
        }

        public static List<SalaryStructureViewModel> getAllBasedOn(int structureID)
        {

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM BasedOn";
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>(quire).ToList();
            return result;
        }

        public static bool deleteSalaryStructure(int structureId)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE SalaryStructure WHERE StructureID='{structureId}'";
            int rowAffected = conn.Execute(quire);
            return rowAffected > 0;
        }


        public static bool saveSalaryStructure(SalaryStructureModel structureModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();
            string quire = $"INSERT INTO SalaryStructure(CompanyID,StructureID,SalaryHeadID,Amount,SalaryTypeID,BasedOnID,SalaryHeadType)" +
                $"VALUES(@CompanyID,@StructureID,@SalaryHeadID,@Amount,@SalaryTypeID,@BasedOnID,@SalaryHeadType)";
            using (var tran = conn.BeginTransaction())
            {
                try
                {
                    deleteSalaryStructure(structureModel.StructureID);

                    foreach (var item in structureModel.AdditionModel) {
                            using (var cmd = new SqlCommand())
                            {
                                cmd.CommandText = quire;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.Parameters.AddWithValue("@CompanyID", structureModel.CompanyID);
                                cmd.Parameters.AddWithValue("@StructureID", structureModel.StructureID);
                                cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
                                cmd.Parameters.AddWithValue("@Amount", item.Amount);
                                cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
                                cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
                                cmd.Parameters.AddWithValue("@SalaryHeadType", item.SalaryHeadType);
                                cmd.ExecuteNonQuery();
                            }
                        
                    }

                    foreach (var item in structureModel.DeductionModel)
                    {
                            using (var cmd = new SqlCommand())
                            {
                                cmd.CommandText = quire;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.Parameters.AddWithValue("@CompanyID", structureModel.CompanyID);
                                cmd.Parameters.AddWithValue("@StructureID", structureModel.StructureID);
                                cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
                                cmd.Parameters.AddWithValue("@Amount", item.Amount);
                                cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
                                cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
                                cmd.Parameters.AddWithValue("@SalaryHeadType", item.SalaryHeadType);
                                cmd.ExecuteNonQuery();
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
