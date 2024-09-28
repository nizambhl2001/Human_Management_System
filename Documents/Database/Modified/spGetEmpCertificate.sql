USE TranscomDBNew
GO

--[dbo].[spGetEmpCertificate]2,'sae0308'
ALTER PROC dbo.spGetEmpCertificate (@CompanyID AS INT,
@Empcode AS VARCHAR(50))

AS
BEGIN
  SELECT
    dbo.EmpCertificateUpload.ID
   ,dbo.EmpCertificateUpload.EmpCode
   ,dbo.EmpCertificateUpload.EducationLevelID
   ,dbo.EmpCertificateUpload.CImage
   ,dbo.EmpCertificateUpload.UserID
   ,dbo.EmpCertificateUpload.CompanyID
    ,dbo.EmpCertificateUpload.FileExtension
   ,dbo.EducationLevel.Description
  FROM dbo.EmpCertificateUpload
  INNER JOIN dbo.EducationLevel
    ON dbo.EmpCertificateUpload.EducationLevelID = dbo.EducationLevel.ID
  WHERE (dbo.EmpCertificateUpload.CompanyID = @CompanyID)
  AND (dbo.EmpCertificateUpload.EmpCode = @Empcode)
--SELECT     dbo.EmpCertificateUpload.ID, dbo.EmpCertificateUpload.EmpCode, dbo.EmpCertificateUpload.EducationLevelID, dbo.EmpCertificateUpload.CImage, 
--                      dbo.EmpCertificateUpload.UserID, dbo.EmpCertificateUpload.CompanyID, dbo.EducationLevel.Description
--FROM         dbo.EmpCertificateUpload INNER JOIN
--                      dbo.EducationLevel ON dbo.EmpCertificateUpload.CompanyID = dbo.EducationLevel.CompanyID AND 
--                      dbo.EmpCertificateUpload.EducationLevelID = dbo.EducationLevel.ID
--WHERE     (dbo.EmpCertificateUpload.EmpCode = @Empcode) AND (dbo.EmpCertificateUpload.CompanyID =@CompanyID) 
END
GO