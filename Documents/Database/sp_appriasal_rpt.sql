/*
SELECT * FROM PassingYear
SELECT * FROM Quarter
SELECT * FROM KPISetup
SELECT * FROM EmployeeWiseKpi
SELECT * FROM AchievementKPI
SELECT * FROM View_EmployeeAll
*/
-- sp_appriasal_rpt '200063',16,1

ALTER PROC sp_appriasal_rpt 
@EmpCode VARCHAR(10),
@YearID INT,
@QuarterID INT
AS
SELECT ak.EmpCode,ve.EmpName,ve.Designation,ve.Department,ve.OfficeBranch Location,ve.JoiningDate, eg.GradeName Grade,
ks.KPIName, ks.KPIType, EmpKpiID EmpWiseKpiId,ewk.Target, ewk.Weight, ewk.IsAgree EmpAgree, 
ewk.IsBossAgree BossAgree, Achievement, Score, AchievmentPercnt AchievementPercent, ManComment, EmpComment, ak.YearID, ak.QuarterID, ak.CompanyID
FROM AchievementKPI ak
JOIN EmployeeWiseKpi ewk ON ewk.ID = ak.EmpKpiID
JOIN KPISetup ks ON ks.ID = ewk.KpiID
JOIN View_EmployeeAll ve ON ve.EmpCode = ak.EmpCode
JOIN EmpGrade eg ON eg.GradeValue = ve.GradeValue
WHERE ak.EmpCode=@EmpCode AND ak.YearID=@YearID AND ak.QuarterID=@QuarterID
