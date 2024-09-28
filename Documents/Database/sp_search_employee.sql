USE TranscomDB
GO

CREATE PROC sp_search_employee @CompanyID INT,
@GradeValue INT,
@EmpName VARCHAR(150),
@Department VARCHAR(100),
@Designation VARCHAR(100),
  @IsBlock VARCHAR(100),
  @Status VARCHAR(100)
AS
  SELECT
    egi.EmpCode
   ,ISNULL(egi.EmpName, '') + ISNULL(' ' + egi.LastName, '')
    + ISNULL(' ' + egi.ShortName, '') AS EmpName
   ,dbo.Department.Description AS Department
   ,dbo.Designation.Description AS Designation
   ,egi.CompanyID
   ,egi.GradeValue
  FROM dbo.EmpGeneralInfo AS egi
  INNER JOIN dbo.EmpEmploymentInfo
    ON egi.EmpCode = dbo.EmpEmploymentInfo.EmpCode
      AND egi.CompanyID = dbo.EmpEmploymentInfo.CompanyID
  INNER JOIN dbo.Department
    ON dbo.EmpEmploymentInfo.DepartmentID = dbo.Department.ID
  INNER JOIN dbo.Designation
    ON dbo.EmpEmploymentInfo.DesignationID = dbo.Designation.ID

  WHERE egi.CompanyID = @CompanyID
  AND dbo.EmpEmploymentInfo.IsBlock=@IsBlock
  AND dbo.EmpEmploymentInfo.Status=@Status
  AND egi.GradeValue =
  CASE
    WHEN @GradeValue <> -1 THEN @GradeValue
    ELSE egi.GradeValue
  END
  AND ISNULL(egi.EmpName, '') + ISNULL(' ' + egi.LastName, '')
  + ISNULL(' ' + egi.ShortName, '') LIKE '%' + ISNULL(@EmpName, '') + '%'
  AND ISNULL(dbo.Department.Description, '') LIKE '%' + ISNULL(@Department, '') + '%'
  AND ISNULL(dbo.Designation.Description, '') LIKE '%' + ISNULL(@Designation, '') + '%'
GO