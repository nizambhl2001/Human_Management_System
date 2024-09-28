USE TranscomDB
GO

Alter VIEW dbo.view_emp_contact_info
AS
SELECT
DISTINCT
  eci.ID
 ,eci.EmpCode
 ,eci.MobileNo
 ,eci.PhoneNo
 ,eci.Email
 ,eci.PreThanaID
 ,eci.PerThanaID
 ,eci.PrePostOffice
 ,eci.PerPostOffice
 ,eci.PreVillage
 ,eci.PerVillage
 ,eci.PersonName
 ,eci.PersonContact
 ,eci.PersonAddress
 ,eci.CompanyID
 ,eci.Relationship
 ,eci.PreCountry
 ,eci.PerCountry
 ,eci.PrePostCode
 ,eci.PerPostCode
 ,eci.MailingAddress
 ,eci.SecondaryMobile
 ,eci.SecandaryMail
 ,eci.SocialURL1
 ,eci.SocialURL2
 ,eci.EmergrncyPostCode
 ,eci.EmergrncyPostCountry
 ,ct.ThanaName AS PreThanaName
 ,cu.UpazilaID AS PreUpazilaID
 ,cu.UpazilaName AS PreUpazilaName
 ,cdis.DistrictID AS PreDistrictID
 ,cdis.DistrictName AS PreDistrictName
 ,cdiv.DivisionID AS PreDivisionID
 ,cdiv.DivisionName AS PreDevisionName
 ,ct1.ThanaName AS PerThanaName
 ,cu1.UpazilaID AS PerUpazilaID
 ,cu1.UpazilaName AS PerUpazilaName
 ,cdis1.DistrictID AS PerDistrictID
 ,cdis1.DistrictName AS PerDistrictName
 ,cdiv1.DivisionID AS PerDivisionID
 ,cdiv1.DivisionName AS PerDivisionName

FROM EmpContactInfo eci
JOIN ContactThana ct
  ON ct.ThanaID = eci.PreThanaID
JOIN ContactUpazila cu
  ON cu.UpazilaID = ct.UpazilaID
JOIN ContactDistrict cdis
  ON cdis.DistrictID = cu.DistrictID
JOIN ContactDivision cdiv
  ON cdiv.DivisionID = cdis.DivisionID
JOIN ContactThana ct1
  ON ct1.ThanaID = eci.PerThanaID
JOIN ContactUpazila cu1
  ON cu1.UpazilaID = ct1.UpazilaID
JOIN ContactDistrict cdis1
  ON cdis1.DistrictID = cu1.DistrictID
JOIN ContactDivision cdiv1
  ON cdiv1.DivisionID = cdis1.DivisionID
GO