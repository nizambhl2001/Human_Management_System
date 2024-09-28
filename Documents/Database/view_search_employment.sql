USE TranscomDB
GO

Create VIEW dbo.view_search_employment
AS
SELECT
  dbo.EmpGeneralInfo.EmpCode
 ,ISNULL(dbo.EmpGeneralInfo.EmpName, '') + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '')
  + ISNULL(' ' + dbo.EmpGeneralInfo.ShortName, '') AS Name
 ,dbo.Department.Description AS Department
 ,dbo.Designation.Description AS Designation
FROM dbo.EmpGeneralInfo
INNER JOIN dbo.EmpEmploymentInfo
  ON dbo.EmpGeneralInfo.EmpCode = dbo.EmpEmploymentInfo.EmpCode
    AND dbo.EmpGeneralInfo.CompanyID = dbo.EmpEmploymentInfo.CompanyID
INNER JOIN dbo.Department
  ON dbo.EmpEmploymentInfo.DepartmentID = dbo.Department.ID
INNER JOIN dbo.Designation
  ON dbo.EmpEmploymentInfo.DesignationID = dbo.Designation.ID
GO