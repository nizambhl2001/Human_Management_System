USE TranscomDB
GO

Create VIEW dbo.view_employment_info
AS
SELECT
  dbo.EmpEmploymentInfo.id
 ,dbo.EmpGeneralInfo.EmpCode
 ,ISNULL(dbo.EmpGeneralInfo.EmpName, '') + ' ' + ISNULL(dbo.EmpGeneralInfo.LastName, '') + ' '
  + ISNULL(dbo.EmpGeneralInfo.ShortName, '') AS EmpName
 ,dbo.EmpEmploymentInfo.BusinessNatureID
 ,dbo.BusinessNature.Description AS BusinessNature
 ,dbo.Department.Description AS Department
 ,dbo.Designation.Description AS Designation
 ,dbo.EmpGrade.GradeName
 ,dbo.EmpGeneralInfo.Gender
 ,dbo.EmpGeneralInfo.CompanyID
 ,dbo.EmpEmploymentInfo.JoinDate
 ,dbo.EmpEmploymentInfo.JobType
 ,dbo.EmpGeneralInfo.GradeValue
 ,dbo.EmpEmploymentInfo.JobDescription
 ,dbo.Branch.Description AS CompanyLocation
 ,dbo.EmpEmploymentInfo.ProjectID
 ,ISNULL(dbo.Project.Description, N'') AS ProjectName
 ,dbo.EmpEmploymentInfo.ConfirmationDate
 ,dbo.EmpEmploymentInfo.ConfirmationDueDate
 ,dbo.EmpEmploymentInfo.CardNo
 ,dbo.EmpEmploymentInfo.Experience
 ,dbo.EmpEmploymentInfo.Resident
 ,dbo.EmpEmploymentInfo.IsComCar
 ,dbo.EmpEmploymentInfo.Status
 ,dbo.EmpEmploymentInfo.IsBlock
 ,dbo.EmpEmploymentInfo.DepartmentID
 ,dbo.EmpEmploymentInfo.DesignationID
 ,dbo.EmpEmploymentInfo.EmpGradeID
 ,dbo.CompanyInfo.CompanyName
 ,dbo.EmpEmploymentInfo.Location
 ,dbo.EmpEmploymentInfo.JobLocation
 ,dbo.EmpEmploymentInfo.Unit
 ,dbo.EmpEmploymentInfo.ReportTo
 ,dbo.EmpEmploymentInfo.OT
FROM dbo.EmpGeneralInfo
LEFT JOIN dbo.EmpEmploymentInfo
  ON dbo.EmpEmploymentInfo.EmpCode = dbo.EmpGeneralInfo.EmpCode
LEFT JOIN dbo.Branch
  ON dbo.EmpEmploymentInfo.JobLocation = dbo.Branch.ID
LEFT JOIN dbo.Project
  ON dbo.EmpEmploymentInfo.ProjectID = dbo.Project.ID
LEFT JOIN dbo.EmpGrade
  ON dbo.EmpEmploymentInfo.EmpGradeID = dbo.EmpGrade.GradeID
LEFT JOIN dbo.CompanyInfo
  ON dbo.EmpEmploymentInfo.CompanyID = dbo.CompanyInfo.ID
LEFT JOIN dbo.BusinessNature
  ON dbo.EmpEmploymentInfo.BusinessNatureID = dbo.BusinessNature.ID
LEFT JOIN dbo.Department
  ON dbo.EmpEmploymentInfo.DepartmentID = dbo.Department.ID
LEFT JOIN dbo.Designation
  ON dbo.EmpEmploymentInfo.DesignationID = dbo.Designation.ID
LEFT JOIN dbo.JobType
  ON dbo.EmpEmploymentInfo.JobType = dbo.JobType.ID
GO