-- sp_GetEnrolmentDeptGradeWise -1, 2,-1,1

ALTER PROC dbo.sp_GetEnrolmentDeptGradeWise
  @EmpCode AS NVARCHAR(MAX),
  @GradeValue INT = -1,
  @DepartmentID INT = -1,
  @CompanyID AS INT
AS
BEGIN 
  SELECT
    dbo.EmpGeneralInfo.EmpCode
   ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, N'') + ISNULL(' ' + dbo.EmpGeneralInfo.ShortName, N'')
    AS EmpName
   ,dbo.EmpEnrolment.AccountNo
   ,dbo.EmpEnrolment.AccountName
   ,dbo.EmpEnrolment.Payby AS PaymentMethod
   ,dbo.EmpEnrolment.IncomeTax
   ,dbo.EmpEnrolment.TaxDeductAmt
   ,dbo.EmpEnrolment.ProvidentFund
   ,dbo.Bank.Description AS BankName
   ,dbo.BankBranch.Description AS BankBranchName
   ,dbo.EmpGeneralInfo.CompanyID
   ,dbo.EmpEnrolment.PayScaleID
   ,dbo.SalaryGrade.GradeName
   ,dbo.EmpEnrolment.Taxpaybycompany
   ,dbo.SalaryGrade.GradeName +'-'+ CAST(dbo.SalaryGrade.GradeSerial as nvarchar)+'--'+cast(dbo.SalaryGrade.Basic as nvarchar) as PrePayScaleName
  
  ,(SELECT dbo.SalaryGrade.GradeName +'-'+ CAST(dbo.SalaryGrade.GradeSerial as nvarchar)+'--'+cast(dbo.SalaryGrade.Basic as nvarchar)
     FROM dbo.SalaryGrade WHERE  dbo.SalaryGrade.ID = dbo.EmpEnrolment.PayScaleID+1) as IncrementPayScaleName
  FROM dbo.SalaryGrade
  RIGHT OUTER JOIN dbo.BankBranch
  RIGHT OUTER JOIN dbo.Bank
  RIGHT OUTER JOIN dbo.EmpEnrolment
    ON dbo.Bank.ID = dbo.EmpEnrolment.Bank
    ON dbo.BankBranch.ID = dbo.EmpEnrolment.BankBranch
    ON dbo.SalaryGrade.ID = dbo.EmpEnrolment.PayScaleID
  LEFT OUTER JOIN dbo.EmpGeneralInfo
    ON dbo.EmpEnrolment.EmpCode = dbo.EmpGeneralInfo.EmpCode
  LEFT OUTER JOIN dbo.EmpEmploymentInfo
    ON dbo.EmpEnrolment.EmpCode = dbo.EmpEmploymentInfo.EmpCode
  WHERE (dbo.EmpGeneralInfo.EmpCode = CASE WHEN @EmpCode<>'-1' THEN @EmpCode ELSE dbo.EmpGeneralInfo.EmpCode END)
    AND (dbo.EmpEmploymentInfo.DepartmentID = CASE WHEN @DepartmentID<>'-1' THEN @DepartmentID ELSE dbo.EmpEmploymentInfo.DepartmentID END)
    AND (dbo.EmpEmploymentInfo.EmpGradeID = CASE WHEN @GradeValue<>'-1' THEN @GradeValue ELSE dbo.EmpEmploymentInfo.EmpGradeID END)
    AND (dbo.EmpEmploymentInfo.Status = 'Active')
  AND (dbo.EmpGeneralInfo.CompanyID = @CompanyID)
  ORDER BY dbo.EmpGeneralInfo.EmpCode
END
GO