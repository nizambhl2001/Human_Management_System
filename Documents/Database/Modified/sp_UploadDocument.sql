USE TranscomDB
GO

ALTER PROC dbo.sp_UploadDocument (@ID INT = NULL,
@EmpCode VARCHAR(50) = NULL,
@Name VARCHAR(50) = NULL,
@type VARCHAR(50) = NULL,
@data VARBINARY(MAX) = NULL,
@Date DATETIME = NULL,
@CompanyID INT = NULL,
@pOptions INT,
@DocumentType INT)
AS
  --Save
  IF (@pOptions = 1)
  BEGIN
    INSERT INTO UploadDocuments (EmpCode, Name, type, data, DocumentType, CompanyID)
      VALUES (@EmpCode, @Name, @type, @Data, @DocumentType, @CompanyID);
  END
  --End Save/Update

  --Select Document
  IF (@pOptions = 2)
  BEGIN
    SELECT
      ID
     ,EmpCode
     ,Name
     ,type
     ,data
     ,Date,
      DocumentType
    FROM UploadDocuments
    WHERE EmpCode = @EmpCode
    AND CompanyID = @CompanyID;
  END
  --End of Select Document

  --Delete Document
  IF (@pOptions = 3)
  BEGIN
    DELETE FROM UploadDocuments
    WHERE ID = @ID
      AND CompanyID = @CompanyID;
  END
--End of Delete Document
GO