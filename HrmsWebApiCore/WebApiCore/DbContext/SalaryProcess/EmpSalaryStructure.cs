using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.SalaryProcess;
using WebApiCore.ViewModels.SalaryProcess;
using HRMS.DbContext.SalarySetup;
using System.Reflection.Emit;

namespace WebApiCore.DbContext.SalaryProcess
{
    public class EmpSalaryStructure
    {
        public static List<SalaryStructureViewModel> GetSalaryStructureAddition(int structureID, int comid)
        {

            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT  SH.SLNo,  SS.StructureID, SS.SalaryHeadID, SS.SalaryHeadType, SS.Amount, " +
                             $" SS.SalaryTypeID, SS.BasedOnID, SS.SortOrder, T.TypeName, BO.BasedOnName, " +
                             $" SH.AccountName, SH.AccountCode,SS.CompanyID FROM  SalaryStructure SS " +
                             $" INNER JOIN SalaryHead SH ON SS.SalaryHeadID = SH.ID " +
                             $" INNER JOIN Type T ON T.ID = SS.SalaryTypeID " +
                             $" INNER JOIN BasedOn BO ON BO.ID = SS.BasedOnID WHERE SS.StructureID = '{structureID}' and SS.SalaryHeadType = 1  ORDER BY SH.SLNo ";
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>(quire).ToList();
            return result;
        }
        public static List<SalaryStructureViewModel> GetSalaryStructureDeduction(int structureID,int comid)
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
        public static void deleteEmpSalaryStructure(string empcode,int comid  )
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"DELETE EmployeesSalaryStructure WHERE EmpCode='{empcode}' AND CompanyID='{comid}';DELETE EmployeesSalary WHERE EmpCode='{empcode}' AND CompanyID='{comid}'";
            int rowAffected = conn.Execute(quire);
           
        }
        //decimal payAmount,

        public static List<SalaryStructureViewModel> xpaymentChangeAddition(decimal payAmount,string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                PayAmount = payAmount,
                EmpCode = empCode

            };
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>("sp_GetSalaryStructure_AdditionByEmpSalaryStar", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }



        public static List<SalaryStructureViewModel> GetSalaryStructure(string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                //PayAmount = payAmount,
                EmpCode=empCode
            };
           List<SalaryStructureViewModel> result= conn.Query<SalaryStructureViewModel>("sp_GetSalaryStructure_Addition", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }
        //public static List<SalaryStructureViewModel> xPaymentChangeDeduction(decimal payAmount)
        //{
        //    var conn = new SqlConnection(Connection.ConnectionString());
        //    var obj = new
        //    {
        //        PayAmount = payAmount
        //    };
        //    List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>("sp_GetSalaryStructure_Deduction", param: obj, commandType: CommandType.StoredProcedure).ToList();
        //    return result;
        //}

        public static List<SalaryStructureViewModel> xPaymentChangeDeduction(decimal payAmount,string empCode)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            var obj = new
            {
                PayAmount = payAmount,
                EmpCode = empCode
            };
            List<SalaryStructureViewModel> result = conn.Query<SalaryStructureViewModel>("sp_GetSalaryStructure_Deduction", param: obj, commandType: CommandType.StoredProcedure).ToList();
            return result;
        }
        public static bool saveEmpSalaryInfo(EmpSalaryStructureModel empSalaryStructureModel)
        {
          
            var conn = new SqlConnection(Connection.ConnectionString());
           // deleteEmpSalaryStructure(empSalaryStructureModel.EmpCode, empSalaryStructureModel.CompanyID);
            //string quire = $"INSERT INTO EmployeesSalary(CompanyID,EmpID,EmpCode,StructureID,Amount)" +
            //    $"VALUES('{empSalaryStructureModel.CompanyID}','{empSalaryStructureModel.EmpID}','{empSalaryStructureModel.EmpCode}','{empSalaryStructureModel.StructureID}','{empSalaryStructureModel.Amount}')";
            //    int rowAffected = conn.Execute(quire);
                saveEmpSalaryStructure(empSalaryStructureModel);


            //return rowAffected>0;
            return true;
        }

        // Save Emp Salary

        public static bool saveEmpSalaryStructure(EmpSalaryStructureModel empSalaryStructure)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open(); 
            using (var tran = conn.BeginTransaction())
            {
                try
                {
                    bool isFirstItem = true;
                    foreach (var item in empSalaryStructure.EmpAdditionModel)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            string EmployeesSalaryInsert;

                           
                            if (isFirstItem==true)
                            {
                                string EmployeesSalary = $"select EmpCode from EmployeesSalary WHERE EmpCode = '{empSalaryStructure.EmpCode}' AND CompanyID = '{empSalaryStructure.CompanyID}' AND StructureID = '{item.StructureID}'";
                                tran.Commit();
                                List<EmpSalaryStructureModel> execute1 = conn.Query<EmpSalaryStructureModel>(EmployeesSalary).ToList();
                                if (execute1.Count > 0 )
                                {
                                    EmployeesSalaryInsert = $" Update EmployeesSalary set Amount = {empSalaryStructure.Amount} WHERE EmpCode = {empSalaryStructure.EmpCode} AND CompanyID = {empSalaryStructure.CompanyID} AND StructureID = '{item.StructureID}'";
                                    cmd.CommandText = EmployeesSalaryInsert;
                                    cmd.Connection = conn;
                                    cmd.Transaction = tran;
                                    cmd.CommandType = CommandType.Text;
                                    cmd.ExecuteNonQuery();
                                  
                                }
                                 
                                else
                                {
                                    EmployeesSalaryInsert = $"INSERT INTO EmployeesSalary (CompanyID, EmpID, EmpCode, StructureID, Amount) VALUES({empSalaryStructure.CompanyID}, {empSalaryStructure.EmpID}, {empSalaryStructure.EmpCode}, {item.StructureID}, {item.Amount})";
                                    cmd.CommandText = EmployeesSalaryInsert;
                                    cmd.Connection = conn;
                                    cmd.Transaction = tran;
                                    cmd.CommandType = CommandType.Text;
                                    cmd.ExecuteNonQuery();
                                   
                                }
                                isFirstItem = false;
                            }
                            string EmployeesSalaryStructure = $"select EmpCode from EmployeesSalaryStructure WHERE EmpCode = '{empSalaryStructure.EmpCode}' AND CompanyID = '{empSalaryStructure.CompanyID}' AND SalaryHeadID = '{item.SalaryHeadID}' AND SalaryHeadType=1";
                             List<EmpSalaryStructureModel> execute = conn.Query<EmpSalaryStructureModel>(EmployeesSalaryStructure).ToList();
                             string EmployeesSalaryStructureInsert;
                            if (execute.Count > 0)
                            {
                                EmployeesSalaryStructureInsert = $"Update EmployeesSalaryStructure set StructureID = '{item.StructureID}', Amount = {item.Amount} ,BasedOnID = '{item.BasedOnID}' WHERE EmpCode = '{empSalaryStructure.EmpCode}' AND CompanyID = '{empSalaryStructure.CompanyID}' AND SalaryHeadID = '{item.SalaryHeadID}' AND SalaryHeadType=1";
                                cmd.CommandText = EmployeesSalaryStructureInsert;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.ExecuteNonQuery();
                            
                             }
                            else
                            {
                                EmployeesSalaryStructureInsert = $"INSERT INTO EmployeesSalaryStructure(CompanyID, EmpID, EmpCode, StructureID, SalaryHeadID, Amount, SalaryTypeID, BasedOnID, SalaryHeadType)" +
                                $"VALUES({empSalaryStructure.CompanyID},{empSalaryStructure.EmpID},{empSalaryStructure.EmpCode},{empSalaryStructure.StructureID},'{item.SalaryHeadID}',{item.Amount},{item.SalaryTypeID},{item.BasedOnID},1)";
                                cmd.CommandText = EmployeesSalaryStructureInsert;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.ExecuteNonQuery();
                            }
                            
                        }

                    }

                    foreach (var item in empSalaryStructure.EmpDeductionModel)
                    {

                        using (var cmd = new SqlCommand())
                        {
                            string EmployeesSalaryInsert;
                            string EmployeesSalaryStructure = $"select EmpCode from EmployeesSalaryStructure WHERE EmpCode = '{empSalaryStructure.EmpCode}' AND CompanyID = '{empSalaryStructure.CompanyID}' AND SalaryHeadID = '{item.SalaryHeadID}' AND SalaryHeadType=2";
                            List<EmpSalaryStructureModel> execute = conn.Query<EmpSalaryStructureModel>(EmployeesSalaryStructure).ToList();                            
                            string EmployeesSalaryStructureInsert;
                            if (execute.Count > 0)
                            {
                                EmployeesSalaryStructureInsert = $"Update EmployeesSalaryStructure set  Amount = '{item.Amount}' WHERE EmpCode = '{empSalaryStructure.EmpCode}' AND CompanyID = '{empSalaryStructure.CompanyID}' AND SalaryHeadID = '{item.SalaryHeadID}' AND SalaryHeadType=2";
                                cmd.CommandText = EmployeesSalaryStructureInsert;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.ExecuteNonQuery();

                            }
                            else
                            {
                                EmployeesSalaryStructureInsert = $"INSERT INTO EmployeesSalaryStructure(CompanyID, EmpID, EmpCode, StructureID, SalaryHeadID, Amount, SalaryTypeID, BasedOnID, SalaryHeadType)" +
                                $"VALUES({empSalaryStructure.CompanyID},{empSalaryStructure.EmpID},{empSalaryStructure.EmpCode},{empSalaryStructure.StructureID},'{item.SalaryHeadID}',{item.Amount},{item.SalaryTypeID},{item.BasedOnID},2)";
                                cmd.CommandText = EmployeesSalaryStructureInsert;
                                cmd.Connection = conn;
                                cmd.Transaction = tran;
                                cmd.CommandType = CommandType.Text;
                                cmd.ExecuteNonQuery();
                            }
                          
                        }


                    }


                    return true;
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw new Exception(err.Message);
                }
            }
        }














        //public static bool saveEmpSalaryStructure(EmpSalaryStructureModel empSalaryStructure)
        //{
        //    var conn = new SqlConnection(Connection.ConnectionString());
        //    conn.Open();
        //    string quire = $"INSERT INTO EmployeesSalaryStructure(CompanyID,EmpID,EmpCode,StructureID,SalaryHeadID,Amount,SalaryTypeID,BasedOnID,SalaryHeadType)" +
        //        $"VALUES(@CompanyID,@EmpID,@EmpCode,@StructureID,@SalaryHeadID,@Amount,@SalaryTypeID,@BasedOnID,@SalaryHeadType)";
        //    using (var tran = conn.BeginTransaction())
        //    {
        //        try
        //        {
        //            foreach (var item in empSalaryStructure.EmpAdditionModel)
        //            {
        //                using (var cmd = new SqlCommand())
        //                {
        //                    cmd.CommandText = quire;
        //                    cmd.Connection = conn;
        //                    cmd.Transaction = tran;
        //                    cmd.CommandType = CommandType.Text;
        //                    cmd.Parameters.AddWithValue("@CompanyID", empSalaryStructure.CompanyID);
        //                    cmd.Parameters.AddWithValue("@EmpID", empSalaryStructure.EmpID);
        //                    cmd.Parameters.AddWithValue("@EmpCode", empSalaryStructure.EmpCode);
        //                    cmd.Parameters.AddWithValue("@StructureID", empSalaryStructure.StructureID);
        //                    cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
        //                    cmd.Parameters.AddWithValue("@Amount", item.Amount);
        //                    cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
        //                    cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
        //                    cmd.Parameters.AddWithValue("@SalaryHeadType",1);
        //                    cmd.ExecuteNonQuery();
        //                }
        //            }
        //            foreach (var item in empSalaryStructure.EmpDeductionModel)
        //            {
        //                using (var cmd = new SqlCommand())
        //                {
        //                    cmd.CommandText = quire;
        //                    cmd.Connection = conn;
        //                    cmd.Transaction = tran;
        //                    cmd.CommandType = CommandType.Text;
        //                    cmd.Parameters.AddWithValue("@CompanyID", empSalaryStructure.CompanyID);
        //                    cmd.Parameters.AddWithValue("@EmpID", empSalaryStructure.EmpID);
        //                    cmd.Parameters.AddWithValue("@EmpCode", empSalaryStructure.EmpCode);
        //                    cmd.Parameters.AddWithValue("@StructureID", empSalaryStructure.StructureID);
        //                    cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
        //                    cmd.Parameters.AddWithValue("@Amount", item.Amount);
        //                    cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
        //                    cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
        //                    cmd.Parameters.AddWithValue("@SalaryHeadType", 2);
        //                    cmd.ExecuteNonQuery();
        //                }

        //            }
        //            tran.Commit();
        //            return true;
        //        }
        //        catch (Exception err)
        //        {
        //            tran.Rollback();
        //            throw new Exception(err.Message);
        //        }
        //    }
        //}
        public static bool EditEmpSalaryInfo(EmpSalaryStructureModel empSalaryStructureModel)
        {

            var conn = new SqlConnection(Connection.ConnectionString());
            deleteEmpSalaryStructure(empSalaryStructureModel.EmpCode, empSalaryStructureModel.CompanyID);
            string quire = $"INSERT INTO EmployeesSalary(CompanyID,EmpID,EmpCode,StructureID,Amount)" +
                $"VALUES('{empSalaryStructureModel.CompanyID}','{empSalaryStructureModel.EmpID}','{empSalaryStructureModel.EmpCode}','{empSalaryStructureModel.StructureID}','{empSalaryStructureModel.Amount}')";
            int rowAffected = conn.Execute(quire);
            EditEmpsalaryStructure(empSalaryStructureModel);


            return rowAffected > 0;
        }
        public static bool EditEmpsalaryStructure(EmpSalaryStructureModel empSalaryStructure)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            conn.Open();

            int isGrossAmount = 0;
            if (empSalaryStructure.Amount > 0)
            {
                isGrossAmount = 1;
            }
            else
            {
                isGrossAmount = 0;
            }
            string quire = $"INSERT INTO EmployeesSalaryStructure(CompanyID,EmpID,EmpCode,StructureID,SalaryHeadID,Amount,SalaryTypeID,BasedOnID,SalaryHeadType)" +
                $"VALUES(@CompanyID,@EmpID,@EmpCode,@StructureID,@SalaryHeadID,@Amount,@SalaryTypeID,@BasedOnID,@SalaryHeadType)";
            using (var tran = conn.BeginTransaction())
            {
                try
                {
                    foreach (var item in empSalaryStructure.EmpAdditionModel)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = quire;
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.Text;
                            cmd.Parameters.AddWithValue("@CompanyID", empSalaryStructure.CompanyID);
                            cmd.Parameters.AddWithValue("@EmpID", empSalaryStructure.EmpID);
                            cmd.Parameters.AddWithValue("@EmpCode", empSalaryStructure.EmpCode);
                            cmd.Parameters.AddWithValue("@StructureID", empSalaryStructure.StructureID);
                            cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
                            cmd.Parameters.AddWithValue("@Amount", item.Amount*isGrossAmount);
                            cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
                            cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
                            cmd.Parameters.AddWithValue("@SalaryHeadType", 1);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    foreach (var item in empSalaryStructure.EmpDeductionModel)
                    {
                        using (var cmd = new SqlCommand())
                        {
                            cmd.CommandText = quire;
                            cmd.Connection = conn;
                            cmd.Transaction = tran;
                            cmd.CommandType = CommandType.Text;
                            cmd.Parameters.AddWithValue("@CompanyID", empSalaryStructure.CompanyID);
                            cmd.Parameters.AddWithValue("@EmpID", empSalaryStructure.EmpID);
                            cmd.Parameters.AddWithValue("@EmpCode", empSalaryStructure.EmpCode);
                            cmd.Parameters.AddWithValue("@StructureID", empSalaryStructure.StructureID);
                            cmd.Parameters.AddWithValue("@SalaryHeadID", item.SalaryHeadID);
                            cmd.Parameters.AddWithValue("@Amount", item.Amount);
                            cmd.Parameters.AddWithValue("@SalaryTypeID", item.SalaryTypeID);
                            cmd.Parameters.AddWithValue("@BasedOnID", item.BasedOnID);
                            cmd.Parameters.AddWithValue("@SalaryHeadType", 2);
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
        public static List<BasedOnModel> BasedOnList()
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"SELECT * FROM BasedOn ";
            List<BasedOnModel> result = conn.Query<BasedOnModel>(quire).ToList();
            return result;
        }

        public static double GetCurrentBasicSalary(string empCode, int companyId)
        {
            using(var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"SELECT TOP 1 Amount FROM ProcessEmpSalaryStructure WHERE EmpCode='{empCode}' AND SalaryHeadID=1 AND CompanyID={companyId} ORDER BY ID DESC";
                double amount = con.ExecuteScalar<double>(sql);
                return amount;
            }
        }

        public static double GetEmpSalaryAmount(string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"SELECT TOP 1 Amount FROM EmployeesSalary WHERE EmpCode='{empCode}'";
                double amount = con.ExecuteScalar<double>(sql);
                return amount;
            }
        }
        public static double GetOtherAllowance(string empCode)
        {
            using (var con = new SqlConnection(Connection.ConnectionString()))
            {
                string sql = $"SELECT TOP 1 Amount FROM EmployeesSalaryStructure WHERE EmpCode='{empCode}' AND SalaryHeadID=17";
                double amount = con.ExecuteScalar<double>(sql);
                return amount;
            }
        }

    }
}
