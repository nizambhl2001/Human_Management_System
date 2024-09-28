USE TranscomDB
GO

-- [sp_shift_edit] 20200312, 20200313, 0, 200363,1,'[03/12/2020],[03/13/2020]'

ALTER PROC dbo.sp_shift_edit @FromDate NVARCHAR(15),
@ToDate NVARCHAR(15),
@ShiftID VARCHAR,
@ReportTo NVARCHAR(MAX),
@CompanyID NVARCHAR
,@DateColumns NVARCHAR(MAX)
AS
BEGIN

  DECLARE @SqlQuery AS NVARCHAR(MAX)

  SET @SqlQuery = N'SELECT
    vea.EmpCode, vea.EmpName, vea.Designation, vea.Department
   ,' + @DateColumns + '
            FROM (SELECT EmpCode,ShiftID ,CONVERT(VARCHAR,ShiftDate, 101) AS ShiftDate FROM ShiftManagemetinfo sm
    WHERE ShiftID = (CASE WHEN ' + @ShiftID + '>0 THEN ' + @ShiftID + ' ELSE ShiftID END) AND (CONVERT(NVARCHAR(15), ShiftDate, 112) BETWEEN ' + @FromDate + ' AND ' + @ToDate + ')
    ) 
    AS tb
    PIVOT(MAX(ShiftID) FOR ShiftDate IN (' + @DateColumns + ')) as Q RIGHT JOIN view_employment_info vea
    ON vea.EmpCode = Q.EmpCode WHERE  vea.ReportTo=' + QUOTENAME(@ReportTo, '''') + '  ORDER BY EmpCode'

  EXEC sp_executesql @SqlQuery
END
GO