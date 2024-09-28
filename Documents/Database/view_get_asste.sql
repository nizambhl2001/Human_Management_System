USE TranscomDB
GO

SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
CREATE VIEW dbo.view_get_asset
AS
SELECT DISTINCT
  asset.ID
 ,an.ACateoryID AS AssetCatagoryId
 ,ac.Categoryname AS AssetCategoryName
 ,asset.AssetID
 ,asset.Model
 ,asset.Serial
 ,asset.PurchesPrice
 ,asset.Confiruration
 ,asset.WarrentyType
 ,asset.Purchesate
 ,asset.Warrentydate
 ,asset.Note
 ,asset.Isactive
 ,asset.CompanyID
FROM AssetSetup AS asset
LEFT JOIN AssetName AS an
  ON an.ID = asset.AssetID
LEFT JOIN AssetCategory AS ac
  ON ac.ID = an.ACateoryID
GO