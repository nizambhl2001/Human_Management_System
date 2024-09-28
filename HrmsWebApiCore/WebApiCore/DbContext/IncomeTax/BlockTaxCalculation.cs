using Dapper.Framework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.DbContext.IncomeTax
{
    public class BlockTaxCalculation
    {
        public static bool ProcessEmpIncomeLWPBlock(TaxCalculationModel blockTaxModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int grade = 0;

            try
            {
                if (blockTaxModel.UserTypeID != 1 && blockTaxModel.UserTypeID != 4)
                {
                    grade = blockTaxModel.Grade;
                }
                else
                {
                    grade = -1;
                }
                var obj = new
                {
                    Empcode=blockTaxModel.EmpCode,
                    PeriodID = blockTaxModel.PeriodID,
                    CompanyID = blockTaxModel.CompanyID,
                    Grade = grade

                };

                int result = conn.Execute("spTAXPresentIncomeDatasaveLWPBlock", param: obj, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        public static bool ProcessEmpIncomeTaxBlock(TaxCalculationModel blockIncomeTaxModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int grade = 0;

            try
            {
                if (blockIncomeTaxModel.UserTypeID != 1 && blockIncomeTaxModel.UserTypeID != 4)
                {
                    grade = blockIncomeTaxModel.Grade;
                }
                else
                {
                    grade = -1;
                }
                var obj = new
                {
                    EmployeeCode = blockIncomeTaxModel.EmpCode,
                    PeriodID = blockIncomeTaxModel.PeriodID,
                    TaxYearID=blockIncomeTaxModel.TaxYearID,
                    CompanyID = blockIncomeTaxModel.CompanyID,
                    Grade = grade

                };

                int result = conn.Execute("spProcessEmpTAXBlock", param: obj, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        public static bool ProcessEmpIncomeAdditionaBlock(TaxCalculationModel additionalBlockModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            int grade = 0;

            try
            {
                if (additionalBlockModel.UserTypeID != 1 && additionalBlockModel.UserTypeID != 4)
                {
                    grade = additionalBlockModel.Grade;
                }
                else
                {
                    grade = -1;
                }
                var obj = new
                {
                    EmployeeCode = additionalBlockModel.EmpCode,
                    PeriodID = additionalBlockModel.PeriodID,
                    CompanyID = additionalBlockModel.CompanyID,
                    Grade = grade

                };

                int result = conn.Execute("spTAXPresentIncomeDatasaveBlock", param: obj, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }
    }
}
