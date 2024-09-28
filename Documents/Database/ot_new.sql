CREATE TABLE [dbo].[OtRequisitionMaster](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[RequisitionDate] [datetime] NULL CONSTRAINT [DF_OtRequisitionMaster_RequisationDate]  DEFAULT (getdate()),
	[SectionID] [int] NULL,
	[ReasonOfOt] [varchar](250) NOT NULL,
	[FromDate] [date] NOT NULL,
	[ToDate] [date] NOT NULL,
	[IsApprove] [bit] NULL CONSTRAINT [DF_OtRequisitionMaster_IsApprove]  DEFAULT ((0)),
	[ApprovedDate] [datetime] NULL,
	[ApprovedBy] [varchar](50) NULL,
	[IsEditByBoss] [bit] NULL,
	[CompanyID] [int] NULL,
 CONSTRAINT [PK_OtRequisitionMaster] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
---------------------------------------------
CREATE TABLE [dbo].[OtRequisitionDetails](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OtRequisitionMasterID] [int] NULL,
	[EmpCode] [varchar](10) NOT NULL,
	[OtDate] [date] NOT NULL,
	[OtHours] [decimal](18, 0) NOT NULL,
	[IsReplace] [bit] NULL,
	[ApprovedHours] [decimal](18, 0) NULL,
 CONSTRAINT [PK_OtRequisitionDetails] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[OtRequisitionDetails]  WITH CHECK ADD  CONSTRAINT [FK_OtRequisitionDetails_OtRequisitionMaster] FOREIGN KEY([OtRequisitionMasterID])
REFERENCES [dbo].[OtRequisitionMaster] ([ID])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[OtRequisitionDetails] CHECK CONSTRAINT [FK_OtRequisitionDetails_OtRequisitionMaster]
GO
-----------------------------------------------
CREATE TABLE [dbo].[OtManualEntry](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode] [varchar](10) NOT NULL,
	[OtMonth] [varchar](6) NOT NULL,
	[OtHours] [decimal](18, 0) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[AddedDate] [datetime] NULL CONSTRAINT [DF_OtManualEntry_AddedDate]  DEFAULT (getdate()),
	[UserID] [int] NULL
) ON [PRIMARY]
--------------------------------------------------
CREATE TABLE [dbo].[OtProcess](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode] [varchar](10) NULL,
	[TotalHour] [decimal](18, 0) NOT NULL,
	[OtMonth] [varchar](6) NOT NULL,
	[PayAmount] [decimal](18, 0) NOT NULL,
	[BankName] [varchar](100) NULL,
	[AccNo] [varchar](50) NULL,
	[CompanyID] [int] NULL
) ON [PRIMARY]
----------------------------------------------
CREATE TABLE [dbo].[OtReplace](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OtRequisitionDetailsID] [int] NULL,
	[EmpCode] [varchar](10) NULL,
	[ReplacedHours] [decimal](18, 0) NULL,
	[ReplacedDate] [date] NULL,
	[CompanyID] [int] NULL,
	[ApplyDate] [date] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[OtReplace]  WITH CHECK ADD  CONSTRAINT [FK_OtReplace_OtRequisitionDetails] FOREIGN KEY([OtRequisitionDetailsID])
REFERENCES [dbo].[OtRequisitionDetails] ([ID])
GO

ALTER TABLE [dbo].[OtReplace] CHECK CONSTRAINT [FK_OtReplace_OtRequisitionDetails]
GO
----------------------------------------
ALTER TABLE BusinessNature 
ADD DepartmentID INT 
-----------------------------------------
CREATE PROC [dbo].[spInsertUpdateOtRequisition]
@ID INT,
@UserID INT,
@ReasonOfOt VARCHAR(50),
@SectionID INT,
@RequisitionDate Date,
@FromDate DATE,
@ToDate DATE,
@IsApprove BIT,
@ApprovedBy VARCHAR(10),
@ApprovedDate DATETIME,
@IsEditByBoss bit,
@CompanyID INT

AS
BEGIN
IF NOT EXISTS(SELECT * FROM OtRequisitionMaster WHERE ID=@ID)
	BEGIN
	INSERT INTO OtRequisitionMaster (UserID,SectionID, ReasonOfOt, RequisitionDate, FromDate, ToDate, IsApprove, ApprovedBy, ApprovedDate, IsEditByBoss, CompanyID)
		VALUES(@UserID, @SectionID, @ReasonOfOt, @RequisitionDate, @FromDate, @ToDate, 0, @ApprovedBy, @ApprovedDate, 0, @CompanyID)
		SELECT IDENT_CURRENT('OtRequisitionMaster')
	END
ELSE
UPDATE OtRequisitionMaster
SET UserID=@UserID,
	ReasonOfOt = @ReasonOfOt,
	SectionID=@SectionID,
	RequisitionDate=@RequisitionDate,
	FromDate=@FromDate,
	ToDate = @ToDate,
	IsApprove = @IsApprove,
	ApprovedBy = @ApprovedBy,
	ApprovedDate = @ApprovedDate,
	IsEditByBoss = @IsEditByBoss
	WHERE ID = @ID
	SELECT @ID
END
------------------------------------------------
CREATE PROC [dbo].[spInsertUpdateOtRequisitionDetails]
@OtRequisitionMasterID INT,
@EmpCode VARCHAR(50),
@OtDate DATE,
@OtHours DECIMAL(18,0),
@IsReplace BIT,
@ApprovedHours DECIMAL(18,0)

AS
BEGIN
IF NOT EXISTS(SELECT * FROM OtRequisitionDetails WHERE EmpCode = @EmpCode AND OtDate=CONVERT(VARCHAR,@OtDate,23))
	BEGIN
	INSERT INTO OtRequisitionDetails (OtRequisitionMasterID,EmpCode, OtDate, OtHours, IsReplace, ApprovedHours)
		VALUES(@OtRequisitionMasterID, @EmpCode, @OtDate, @OtHours, @IsReplace, @ApprovedHours)
	END
ELSE
UPDATE OtRequisitionDetails
SET IsReplace = @IsReplace,
	ApprovedHours = @ApprovedHours
	WHERE EmpCode=@EmpCOde AND OtDate=CONVERT(VARCHAR,@OtDate,23)
END

-----------------------------------------------
CREATE PROC [dbo].[spInsertUpdateOtManual]
@EmpCode VARCHAR(10),
@OtMonth VARCHAR(6),
@OtHours DECIMAL(18,0),
@CompanyID INT,
@UserID INT
AS
IF NOT EXISTS(SELECT * FROM OtManualEntry WHERE EmpCode=@EmpCode AND OtMonth=@OtMonth AND CompanyID=@CompanyID)
BEGIN 
	INSERT INTO OtManualEntry (EmpCode, OtMonth,OtHours,CompanyID, UserID)
	VALUES(@EmpCode,@OtMonth,@OtHours,@CompanyID, @UserID)
END
ELSE
BEGIN
UPDATE OtManualEntry
SET OtHours=@OtHours
WHERE EmpCode=@EmpCode AND OtMonth=@OtMonth AND CompanyID=@CompanyID
END
---------------------------------------------------
CREATE PROC [dbo].[spGetManualOt]
@EmpCode VARCHAR(10),
@OtMonth VARCHAR(6),
@CompanyID INT
AS 
SELECT om.ID, om.EmpCode, ve.EmpName, ve.Department, ve.Designation, om.OtMonth, om.OtHours, om.CompanyID, om.AddedDate, om.UserID FROM OtManualEntry om LEFT JOIN View_EmployeeAll ve ON ve.EmpCode = om.EmpCode
WHERE om.EmpCode = CASE WHEN @EmpCode<>'-1' THEN @EmpCode ELSE om.EmpCode END
AND om.OtMonth = CASE WHEN @OtMonth<>'-1' THEN @OtMonth ELSE om.OtMonth END
AND om.CompanyID=@CompanyID
-----------------------------------------------------
CREATE PROC [dbo].[spGetMonthlyApprovedOt]
-- spGetMonthlyApprovedOt 1,'150001','202003',-1,-1
@CompanyID INT,
@EmpCode VARCHAR(10),
@OtMonth VARCHAR(6),
@DepartmentID INT,
@LocationID INT
AS
SELECT od.EmpCode,vei.EmpName,vei.Designation, SUM(od.OtHours) OtHOurs, SUM(od.ApprovedHours) ApprovedHours,od.OtDate
FROM OtRequisitionDetails od JOIN OtRequisitionMaster om ON om.ID = od.OtRequisitionMasterID
JOIN view_employment_info vei ON vei.EmpCode = od.EmpCode
WHERE om.IsApprove= 1
 AND SUBSTRING(CONVERT(VARCHAR, od.OtDate, 112),0,7)=@OtMonth
 AND od.EmpCode = CASE WHEN @EmpCode<>-1 THEN @EmpCode ELSE od.EmpCOde END
 AND om.CompanyID = 1
 AND vei.DepartmentID = CASE WHEN @DepartmentID>0 THEN @DepartmentID ELSE vei.DepartmentID END
 AND vei.Location = CASE WHEN @LocationID>0 THEN @LocationID ELSE vei.Location END

GROUP BY od.OtDate, od.EmpCode, vei.EmpName,vei.Designation
----------------------------------------------------------------
CREATE PROC [dbo].[spInsertUpdateOtProcess]
@EmpCode VARCHAR(10),
@OtMonth VARCHAR(10),
@TotalHour DECIMAL(18,0),
@PayAmount DECIMAL(18,0),
@BankName VARCHAR(100),
@AccNo VARCHAR(20),
@CompanyID INT
AS
IF NOT EXISTS(SELECT * FROM OtProcess WHERE EmpCode=@EmpCode AND OtMonth=@OtMonth AND CompanyID=@CompanyID)
BEGIN
INSERT INTO OtProcess(EmpCode, OtMonth, TotalHour,PayAmount,BankName,AccNo,CompanyID)
VALUES(@EmpCode, @OtMonth, @TotalHour, @PayAmount, @BankName, @AccNo, @CompanyID)
END
ELSE
BEGIN
UPDATE OtProcess SET TotalHour = @TotalHour, PayAmount=@PayAmount, BankName=@BankName, AccNo=@AccNo
WHERE EmpCode=@EmpCode AND OtMonth=@OtMonth AND CompanyID=@CompanyID
END
---------------------------------------------------------------
CREATE PROC [dbo].[spGetReplacedApprovedOt]
@EmpCode VARCHAR(10),
@OtDate VARCHAR(8),
@CompanyID INT
AS
SELECT od.ID, od.EmpCode, od.OtDate, od.OtHours, otR.ReplacedDate,
 ISNULL(otR.ReplacedHours,0) ReplacedHours, (od.OtHours-ISNULL(otR.ReplacedHours,0)) OtBalance, om.CompanyID 
FROM OtRequisitionDetails od
LEFT JOIN OtReplace otR ON otR.OtRequisitionDetailsID = od.ID
JOIN OtRequisitionMaster om ON om.ID = od.OtRequisitionMasterID
WHERE om.IsApprove=1 AND od.IsReplace=1 AND od.EmpCode=CASE WHEN @EmpCode<>'-1' THEN @EmpCode ELSE od.EmpCode END
AND CONVERT(VARCHAR(8), od.OtDate, 112)=CASE WHEN @OtDate<>'-1' THEN @OtDate ELSE CONVERT(VARCHAR(8), od.OtDate, 112) END
AND om.CompanyID=@CompanyID