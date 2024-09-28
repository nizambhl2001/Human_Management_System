 CREATE PROC sp_get_carhouse_tax (@EmpCode NVARCHAR(50),@CompanyID INT) AS
  SELECT cha.ID,cha.EmpCode,egi.EmpName,d.Description AS Department,d1.Description AS Designation,eei.JoinDate,cha.AssainDate,cha.Type,cha.Active
    FROM CarHouseAssain AS cha  
  INNER JOIN EmpEmploymentInfo AS eei ON eei.EmpCode=cha.EmpCode
  INNER JOIN Department AS d ON d.ID=eei.DepartmentID
  INNER JOIN Designation AS d1 ON d1.ID=eei.DesignationID 
  INNER JOIN EmpGeneralInfo AS egi ON egi.EmpCode=cha.EmpCode   
  WHERE cha.EmpCode=@EmpCode AND cha.CompanyID=@CompanyID