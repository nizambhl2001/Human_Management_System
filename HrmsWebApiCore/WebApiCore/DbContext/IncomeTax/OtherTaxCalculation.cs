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
    public class OtherTaxCalculation
    {
        // Employee List Filter 
        public static bool GetEmployeeInfoListByFilter(TaxCalculationModel otherTaxModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
            string quire = $"UPPER(IncomeTex) = 'YES' and CompanyID ={otherTaxModel.CompanyID}";
            var result = ProcessIncomeTax.GetEmployees(quire);
            if (result.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        // Process Employee Bonus Tax 
        public static bool ProcessEmpBonusTAx(TaxCalculationModel otherTaxModel)
        {
            var conn = new SqlConnection(Connection.ConnectionString());
         
            try
            {
                var obj = new
                {
                    empCode1 = otherTaxModel.EmpCode,
                    Bonustype = otherTaxModel.BonusTypeID,
                    PeriodID = otherTaxModel.PeriodID,
                    TaxYearID = otherTaxModel.TaxYearID,
                    CompanyID = otherTaxModel.CompanyID,
                    Grade = otherTaxModel.Grade

                };
                 conn.Execute("spProcessEmpBonusTAX", param: obj, commandType: CommandType.StoredProcedure);
                 return true;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }
}
