USE TranscomDB
GO

ALTER PROC dbo.INSertEmpCertificate (@EmpCode NVARCHAR(50),
@EducationLevelID INT,
@CImage IMAGE,
@FileExtension VARCHAR(10),
@UserID INT,
@CompanyID INT)
AS
  IF EXISTS (SELECT
        *
      FROM EmpCertificateUpload
      WHERE EmpCode = @EmpCode
      AND EducationLevelID = @EducationLevelID
      AND CompanyID = @CompanyID)
  BEGIN

    UPDATE EmpCertificateUpload
    SET EmpCode = @EmpCode
       ,EducationLevelID = @EducationLevelID
       ,CImage = @CImage
       ,UserID = @UserID
       ,CompanyID = @CompanyID,
      FileExtension = @FileExtension
    WHERE EmpCode = @EmpCode
    AND EducationLevelID = @EducationLevelID
    AND CompanyID = @CompanyID
  END
  ELSE
  BEGIN
    INSERT INTO EmpCertificateUpload (EmpCode, EducationLevelID, CImage, FileExtension, UserID, CompanyID)
      VALUES (@EmpCode, @EducationLevelID, @CImage,@FileExtension, @UserID, @CompanyID)

  END
GO