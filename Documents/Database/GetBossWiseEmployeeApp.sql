USE TranscomDB
GO

--      GetBossWiseEmployeeApp '150040'

CREATE PROC dbo.GetBossWiseEmployeeApp @Empcode AS NVARCHAR(50)
AS
BEGIN
  IF ((SELECT
        COUNT(Reporting3) AS dcc
      FROM dbo.View_EmploeeHicherchyLayer
      WHERE Reporting3 = @EmpCode
      GROUP BY Reporting3)
    > 0)
  BEGIN
    (
    SELECT
      t.EmpCode
     ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '') AS EmpName
    FROM (SELECT
        EmpCode
      FROM (SELECT
          dbo.View_EmploeeHicherchy.EmpCode
        FROM dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_3
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_2
          ON View_EmploeeHicherchy_3.EmpCode = View_EmploeeHicherchy_2.ReportTo
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_1
          ON View_EmploeeHicherchy_2.EmpCode = View_EmploeeHicherchy_1.ReportTo
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy
          ON View_EmploeeHicherchy_1.EmpCode = dbo.View_EmploeeHicherchy.ReportTo
        WHERE (View_EmploeeHicherchy_3.EmpCode = @Empcode)
        UNION
        SELECT
          View_EmploeeHicherchy_1.EmpCode
        FROM dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_3
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_2
          ON View_EmploeeHicherchy_3.EmpCode = View_EmploeeHicherchy_2.ReportTo
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_1
          ON View_EmploeeHicherchy_2.EmpCode = View_EmploeeHicherchy_1.ReportTo
        GROUP BY View_EmploeeHicherchy_1.EmpCode
                ,View_EmploeeHicherchy_2.EmpCode
                ,View_EmploeeHicherchy_3.EmpCode
        HAVING (View_EmploeeHicherchy_3.EmpCode = @Empcode)

        UNION
        SELECT
          View_EmploeeHicherchy_2.EmpCode
        FROM dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_3
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_2
          ON View_EmploeeHicherchy_3.EmpCode = View_EmploeeHicherchy_2.ReportTo
        GROUP BY View_EmploeeHicherchy_2.EmpCode
                ,View_EmploeeHicherchy_3.EmpCode
        HAVING (View_EmploeeHicherchy_3.EmpCode = @Empcode)) AS t
      GROUP BY EmpCode
      UNION
      SELECT
        @Empcode AS EmpCode) t
    INNER JOIN [dbo].[EmpGeneralInfo]
      ON t.EmpCode = [dbo].[EmpGeneralInfo].EmpCode
    )



  END




  ELSE
  IF ((SELECT
        Reporting2
      FROM (SELECT
          Reporting2
        FROM dbo.View_EmploeeHicherchyLayer
        GROUP BY Reporting2
        HAVING (NOT
        (Reporting2 IN (SELECT
            Reporting3
          FROM dbo.View_EmploeeHicherchyLayer AS View_EmploeeHicherchyLayer_1
          GROUP BY Reporting3
          HAVING (NOT (Reporting3 IS NULL)))
        ))) AS t
      WHERE Reporting2 = @EmpCode)
    > 0
    )
  BEGIN

    SELECT
      L.EmpCode
     ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '') AS EmpName
    FROM (SELECT
        EmpCode
      FROM (SELECT
          dbo.View_EmploeeHicherchy.EmpCode
        FROM dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_2
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_1
          ON View_EmploeeHicherchy_2.EmpCode = View_EmploeeHicherchy_1.ReportTo
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy
          ON View_EmploeeHicherchy_1.EmpCode = dbo.View_EmploeeHicherchy.ReportTo
        WHERE (View_EmploeeHicherchy_2.EmpCode = @Empcode)
        UNION
        SELECT
          View_EmploeeHicherchy_1.EmpCode
        FROM dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_2
        RIGHT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_1
          ON View_EmploeeHicherchy_2.EmpCode = View_EmploeeHicherchy_1.ReportTo
        WHERE (View_EmploeeHicherchy_2.EmpCode = @Empcode)
        GROUP BY View_EmploeeHicherchy_1.EmpCode
        --union
        --	select 	@Empcode as EmpCode , @Empcode as Reporting1
        UNION
        SELECT
          @Empcode AS EmpCode) AS t
      GROUP BY EmpCode) L
    INNER JOIN [dbo].[EmpGeneralInfo]
      ON l.EmpCode = [dbo].[EmpGeneralInfo].EmpCode


  END



  ELSE
  IF ((SELECT
        Reporting1
      FROM (SELECT
          Reporting1
        FROM dbo.View_EmploeeHicherchyLayer
        GROUP BY Reporting1
        HAVING (NOT (Reporting1 IN (SELECT
            Reporting2
          FROM dbo.View_EmploeeHicherchyLayer AS View_EmploeeHicherchyLayer_1
          GROUP BY Reporting2
          HAVING (NOT (Reporting2 IS NULL)))
        ))) AS t
      WHERE Reporting1 = @EmpCode)
    > 0)
  BEGIN
    (


    SELECT
      L.EmpCode
     ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '') AS EmpName
    FROM (SELECT
        EmpCode
      FROM (SELECT
          dbo.View_EmploeeHicherchy.EmpCode
         ,View_EmploeeHicherchy_1.EmpCode AS Reporting1
        FROM dbo.View_EmploeeHicherchy
        LEFT OUTER JOIN dbo.View_EmploeeHicherchy AS View_EmploeeHicherchy_1
          ON dbo.View_EmploeeHicherchy.ReportTo = View_EmploeeHicherchy_1.EmpCode
        WHERE (View_EmploeeHicherchy_1.EmpCode = @Empcode)) t) L
    INNER JOIN [dbo].[EmpGeneralInfo]
      ON L.EmpCode = [dbo].[EmpGeneralInfo].EmpCode

    UNION

    SELECT
      @Empcode AS Empcode
     ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '') AS EmpName
    FROM dbo.EmpGeneralInfo
    WHERE Empcode = @Empcode

    )

  END
  ELSE
  BEGIN

    SELECT
      @Empcode AS Empcode
     ,dbo.EmpGeneralInfo.EmpName + ISNULL(' ' + dbo.EmpGeneralInfo.LastName, '') AS EmpName
    FROM dbo.EmpGeneralInfo
    WHERE Empcode = @Empcode

  --select 	@Empcode as EmpCode , @Empcode as Reporting1tra

  END
END
GO