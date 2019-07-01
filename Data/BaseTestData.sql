/****** Empty all the tables first, so we can rerun this script any number of times and get the same result ******/
DELETE FROM [dbo].[Clinical]
DELETE FROM [dbo].[SettingsInSections]
DELETE FROM [dbo].[Treatment]
DELETE FROM [dbo].[AdverseEvent]
/******** Renamed 'Patient' to 'PatientTable' in all references in this script 15/06/2012 RP ********/
DELETE FROM [dbo].[PatientTable]
DELETE FROM [dbo].[PatientRecord]
DELETE FROM [dbo].[Clinician]
DELETE FROM [dbo].[Referral]
DELETE FROM [dbo].[SiteStatus]


/****** Object:  Table [dbo].[Section]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[Section] ([Id], [LicenceTypeId], [ParentSectionId], [Name], [Code],[Segment],[Contact],[Title],[PhoneNumber],[FirstAddressLine],[Town],[County],[PostCode],[Country],[DataMigration]) VALUES (N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', N'6C86E30E-540B-464E-A97B-1D1F576E3C61', N'd93397be-a098-46c2-9a41-7db4159e9fa5', N'Office', NULL,N'Practice',N'Paul Hughes',N'Sales Coordinator',N'01209 710999',N'1 North Crofty',N'Tolvaddon',N'Cornwall',N'TR14 0HX',N'England',0)
INSERT [dbo].[Section] ([Id], [LicenceTypeId], [ParentSectionId], [Name], [Code],[Segment],[Contact],[Title],[PhoneNumber],[FirstAddressLine],[Town],[County],[PostCode],[Country],[DataMigration]) VALUES (N'd93397be-a098-46c2-9a41-7db4159e9fa5', N'514957A0-5A31-400E-B1F9-281FACDA5FB1', NULL, N'Test',NULL, N'PCT',N'Jack Kavanagh',N'Software Developer',N'01209 710999',N'1 North Crofty',N'Tolvaddon',N'Cornwall',N'TR14 0HX',N'England',0)
/****** Object:  Table [dbo].[User]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[User] ([Id], [Username], [Password], [PasswordSalt],[PasswordExpiry], [IsApproved], [FullName],[FailedLoginAttempts],[HasSignedLicenseAgreement]) VALUES( N'bd825e93-b703-4fd7-9714-1269fe3c1a75', N'Jay', N'20F642AC1DA3FDCC565A71D733748ADBBA798DD8', N'wgW9U5u3ZnFeCb2wX1s=',CAST('2025-05-08 12:35:29' AS smalldatetime), 1, NULL,0,'false')
INSERT [dbo].[User] ([Id], [Username], [Password], [PasswordSalt],[PasswordExpiry], [IsApproved], [FullName],[FailedLoginAttempts],[HasSignedLicenseAgreement]) VALUES( N'fbeca500-884a-4e3c-9a1f-817270cf3b06', N'Mary', N'5ECF4F6562F80D5D7CD6D96FAE387D505789E13F', N'QZtis9alsuShd7xj1EI=',CAST('2025-05-08 12:35:29' AS smalldatetime), 1, 'Mary',0,'false')
/****** Object:  Table [dbo].[Licence]     Script Date: 23/11/2011 11:36:00 ******/
INSERT INTO [dbo].[Licence] ([Id], [SectionId], [NumberOfPatientRecords], [LicenceExpires])
     VALUES(N'A4DC53ED-2F4C-4917-B315-A8FCC42A020C',N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105',200,'2012-12-07 00:00:00')
INSERT INTO [dbo].[Licence] ([Id], [SectionId], [NumberOfPatientRecords], [LicenceExpires])
     VALUES(N'd93397be-a098-46c2-9a41-7db4159e9fa5',N'D93397BE-A098-46C2-9A41-7DB4159E9FA5',200,'2012-12-07 00:00:00')
/****** Object:  Table [dbo].[Clinician]     Script Date: 30/11/2009 07:49:00 ******/
INSERT [dbo].[Clinician]([Id],[Name],[Phone],[SectionId])VALUES('DCCD79B4-14F5-416C-AE7D-467359D6ED47','Blue',NULL,'fe807a51-e6f2-4f39-bccc-6adb3ee9c105')
INSERT [dbo].[Clinician]([Id],[Name],[Phone],[SectionId])VALUES('43F4D05B-FD14-4150-8B7C-9C5A5D2D5FB1','Green','012345','fe807a51-e6f2-4f39-bccc-6adb3ee9c105')
/****** Object:  Table [dbo].[PatientTable]    Script Date: 06/10/2009 15:30:00 ******/
/************* Test Data for search patient ****************************/

/************* Test Data PatientTable has been changed as the encrypted fields are now of type varbinary 15/06/2012 RP ****************************/

DECLARE @KeyGuid AS UNIQUEIDENTIFIER
SET @KeyGuid = key_guid( 'PatientData_Key')

OPEN SYMMETRIC KEY [PatientData_Key] DECRYPTION BY CERTIFICATE [cert_PatientData_key]

INSERT [dbo].[PatientTable]([Id], [EncryptedFirstName], [EncryptedSurname], [Title], [Sex], [Gender], [EncryptedNHSNumber], [Born]
, [EncryptedPhone], [EncryptedFirstAddressLine], [EncryptedSecondAddressLine], [EncryptedThirdAddressLine], [EncryptedFourthAddressLine], [EncryptedFifthAddressLine]
, [EncryptedPostCode], [EncryptedMobile], [ClinicianId], [RegisteredSectionId], [TestingSectionId], [Active], [InactiveReason]) 
VALUES (N'1969363d-e43f-42c6-9ccf-9a57691eaa56'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'RYAN'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'PHELPS'))
, N'Mr'
, N'Male'
, N'Male'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, CAST('01/01/1999' AS SmallDateTime)
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'first line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'second line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'third line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fourth line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fith line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'tr16 4nx'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'07964201212'))
, 'DCCD79B4-14F5-416C-AE7D-467359D6ED47'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, 1
, NULL)

INSERT [dbo].[PatientTable] ([Id], [EncryptedFirstName], [EncryptedSurname], [Title], [Sex], [Gender], [EncryptedNHSNumber], [Born], [EncryptedPhone], [EncryptedFirstAddressLine], [EncryptedSecondAddressLine], [EncryptedThirdAddressLine], [EncryptedFourthAddressLine], [EncryptedFifthAddressLine], [EncryptedPostCode], [EncryptedMobile], [ClinicianId], [RegisteredSectionId], [TestingSectionId], [Active], [InactiveReason]) 
VALUES (N'd822e536-7e94-453f-9c8f-7147a9d04b88'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'Jasmine'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'PHELPS'))
, N'Mrs'
, N'Female'
, N'Female'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, CAST('01/01/1999' AS SmallDateTime)
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'first line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'second line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'third line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fourth line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fith line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'tr16 4nx'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'07964201212'))
, 'DCCD79B4-14F5-416C-AE7D-467359D6ED47'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, 1
, NULL)


INSERT [dbo].[PatientTable] ([Id], [EncryptedFirstName], [EncryptedSurname], [Title], [Sex], 
[Gender], [EncryptedNHSNumber], [Born], [EncryptedPhone], [EncryptedFirstAddressLine], [EncryptedSecondAddressLine], [EncryptedThirdAddressLine], [EncryptedFourthAddressLine], [EncryptedFifthAddressLine], [EncryptedPostCode], [EncryptedMobile], [ClinicianId], [RegisteredSectionId], [TestingSectionId], [Active], [InactiveReason]) 
VALUES (N'674b5df3-9763-44ab-88d1-385b24728811'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'Jack'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'PHELPS'))
, N'Mr'
, N'Male'
, N'Male'
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, CAST('01/01/1999' AS SmallDateTime)
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'12345678'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'first line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'second line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'third line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fourth line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'fith line'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'tr16 4nx'))
, encryptbykey( @KeyGuid, CONVERT(NVARCHAR,'07964201212'))
, N'DCCD79B4-14F5-416C-AE7D-467359D6ED47'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105'
, 1
, NULL)
CLOSE SYMMETRIC KEY [PatientData_Key]

/***********************************************************************/
/****** Object:  Table [dbo].[UsersInSections]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[UsersInSection] ([Id], [UserId], [SectionId]) VALUES (N'ffaa4d14-a9d4-41fc-9d30-10ad263f41c0', N'fbeca500-884a-4e3c-9a1f-817270cf3b06', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105')
INSERT [dbo].[UsersInSection] ([Id], [UserId], [SectionId]) VALUES (N'f9c9b5d5-b255-4117-8b71-c96c4b95e9b3', N'bd825e93-b703-4fd7-9714-1269fe3c1a75', N'd93397be-a098-46c2-9a41-7db4159e9fa5')
/****** Object:  Table [dbo].[AdverseEvent]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[AdverseEvent] ([Id], [PatientId], [DateTime], [IncidentId], [SeverityId], [AdverseActionId], [OutcomeId], [Comments]) VALUES (N'710a6c85-6bdf-45e6-80a6-6b837dcceb6e', N'1366b276-9c41-45bd-bfc7-3f93bf022065', CAST(0x9BBC0000 AS SmallDateTime), N'c001e323-1c20-4c09-9def-61dbc2705216', N'1ec7af83-0cac-49f7-b183-a6c7ca482805', N'192f6465-61ee-4379-b88c-159d8b56fb33', N'e8538c8e-5f89-4bf4-bfe4-21227a79c866', N'sadasfdasd')
INSERT [dbo].[AdverseEvent] ([Id], [PatientId], [DateTime], [IncidentId], [SeverityId], [AdverseActionId], [OutcomeId], [Comments]) VALUES (N'6c00082f-1796-40a7-b698-bed2e21a11ff', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C030000 AS SmallDateTime), N'c001e323-1c20-4c09-9def-61dbc2705216', N'1ec7af83-0cac-49f7-b183-a6c7ca482805', N'ede64439-e8df-42c7-a855-14ed4c675fa8', N'e8538c8e-5f89-4bf4-bfe4-21227a79c866', N'')
/****** Object:  Table [dbo].[Treatment]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'3ec041de-b468-4a89-a7ec-04948d8604a5', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C080000 AS SmallDateTime), 2.5, 2, 2, 0, 14, 14, CAST(0x9C160000 AS SmallDateTime), N'', CAST(0x00009C0801058B9F AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'79b4fbf9-6f4b-4e03-9a3a-06367c8c2767', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C110000 AS SmallDateTime), 2.5, 2, 2, 0, 32, 32, CAST(0x9C310000 AS SmallDateTime), N'', CAST(0x00009C11009AB2CD AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'0864ac17-2596-4767-b80d-0e9d7f12251b', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C110000 AS SmallDateTime), 6.7, 2.8, 2.8, 0, 27, 27, CAST(0x9C2C0000 AS SmallDateTime), N'',   CAST(0x00009C1100B8C9C1 AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'34f82631-ffa9-44cb-982d-100576a81a56', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C100000 AS SmallDateTime), 2.6, 4.5, 4.5, 0, 32, 32, CAST(0x9C300000 AS SmallDateTime), N'',   CAST(0x00009C1000C5996E AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'339e5ffc-f37b-4d3f-9165-126f99151ad9', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C080000 AS SmallDateTime), 2.5, 2, 2, 0, 28, 28, CAST(0x9C240000 AS SmallDateTime), N'',   CAST(0x00009C080107A512 AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'33484497-2e07-4e2f-b1f5-1550ebcbde80', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C080000 AS SmallDateTime), 2.5, 2, 2, 0, 14, 14, CAST(0x9C160000 AS SmallDateTime), N'',   CAST(0x00009C0801078EAF AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'b421251e-ef22-4221-b29b-1701ee5cfdd6', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C0F0000 AS SmallDateTime), 2.5, 8, 4, 1, 28, 28, CAST(0x9C2B0000 AS SmallDateTime), N'',   CAST(0x00009C0F00D83CEC AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'5d2b4edb-5f2b-448e-9b33-1717efe4c212', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9BDF0000 AS SmallDateTime), 0.8, 2, 2, 0, 17, 17, CAST(0x9BF00000 AS SmallDateTime), N'',   CAST(0x00009BF500B58E6D AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'd3855fde-96ce-4454-b796-17440dc07863', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C110000 AS SmallDateTime), 6.1, 2.7, 2.7, 0, 27, 27, CAST(0x9C2C0000 AS SmallDateTime), N'',   CAST(0x00009C1100B8D879 AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'70fa9c7e-9baf-4551-be6a-175da43a69a3', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C080000 AS SmallDateTime), 2.5, 10, 2, 0, 32, 32, CAST(0x9C280000 AS SmallDateTime), N'',   CAST(0x00009C08010A025D AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'28989b69-b1bc-49ab-b181-1adadba6537f', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9BF50000 AS SmallDateTime), 0.8, 9, 8.5, 0, 10, 7, CAST(0x9BFD0000 AS SmallDateTime), N'3 mg tablets dosing schedule is better for this patient',   CAST(0x00009BF300AAB6B6 AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'0c528004-5386-4856-a9a9-22799c3c9833', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C070000 AS SmallDateTime), 9.9, 2.7, 2.7, 0, 26, 26, CAST(0x9C210000 AS SmallDateTime), N'',   CAST(0x00009C100109A4C6 AS DateTime), 2.5, N'cc4446ee-3520-46b9-beaa-2174916105a3', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
INSERT [dbo].[Treatment] ([Id], [PatientId], [Date], [INR], [Dose], [SuggestedDose], [Omits], [Review], [SuggestedReview], [NextTest], [Comments], [Inserted], [TargetINR], [TreatmentStatusId], [Schedule], [UserId],[Use5],[Use3],[Use1],[UseHalf],[UseSplit],[NPSA],[Printed],[DosingMethod],[PocTBatchNumber], [SectionId], [TestingMethod],[UseForEQC], [VersionNo]) VALUES (N'430f3ada-6b5c-4595-bed9-23189017ed68', N'674b5df3-9763-44ab-88d1-385b24728811', CAST(0x9C110000 AS SmallDateTime), 2.5, 2, 2, 0, 32, 32, CAST(0x9C310000 AS SmallDateTime), N'',   CAST(0x00009C1100A24553 AS DateTime), 2.5, N'62FC8D64-D661-44CA-991F-036311A98F47', NULL, N'fbeca500-884a-4e3c-9a1f-817270cf3b06',1,1,1,1,1,0,0,N'Coventry Maintenance','Unknown', N'fe807a51-e6f2-4f39-bccc-6adb3ee9c105', NULL,0, '1.0.0')
/****** Object:  Table [dbo].[UserToRoles]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[UserToRoles] ([Id], [UserInSectionId], [RoleId]) VALUES (N'67dfdfd7-daf4-4b85-b035-78e5d34e84ae', N'ffaa4d14-a9d4-41fc-9d30-10ad263f41c0', N'b3f0ece9-3e48-4824-91c0-0bc8feac8f59')/*Mary Location Admin*/
INSERT [dbo].[UserToRoles] ([Id], [UserInSectionId], [RoleId]) VALUES (N'da29bbe7-b329-4a48-947f-ab983b1cc053', N'ffaa4d14-a9d4-41fc-9d30-10ad263f41c0', N'764719cf-1abd-41b0-9ff5-62ee699b2173')/*Mary Clinician*/
INSERT [dbo].[UserToRoles] ([Id], [UserInSectionId], [RoleId]) VALUES (N'a7cc5bd4-417e-4d99-b590-5b5ea71e1680', N'ffaa4d14-a9d4-41fc-9d30-10ad263f41c0', N'32acb9d4-b13d-44b3-8259-ade1521132e7')/*Mary Organisation Admin*/
INSERT [dbo].[UserToRoles] ([Id], [UserInSectionId], [RoleId]) VALUES (N'a883da3e-ea4e-4abb-819e-42064360250f', N'ffaa4d14-a9d4-41fc-9d30-10ad263f41c0', N'f5b2cfba-1de1-4195-a3bf-80b5bc16670e')/*Mary Organisation Clinical Lead*/
INSERT [dbo].[UserToRoles] ([Id], [UserInSectionId], [RoleId]) VALUES (N'e7724dcd-e058-4aa2-a0d7-1f3d8507bbcd', N'f9c9b5d5-b255-4117-8b71-c96c4b95e9b3', N'32acb9d4-b13d-44b3-8259-ade1521132e7')/*Jay Organisation Admin*/
/****** Object:  Table [dbo].[SettingsInSections]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[SettingsInSections] ([Id], [SectionId], [SettingId], [Value]) VALUES (N'7717d157-aa99-4dbc-aadd-4335600fe547', N'd93397be-a098-46c2-9a41-7db4159e9fa5', N'1bccd25a-4d4e-4d43-85a3-ce5a0ced009a', N'0.29')
INSERT [dbo].[SettingsInSections] ([Id], [SectionId], [SettingId], [Value]) VALUES (N'77337f39-04c4-4e75-b2cb-935784fa66fd', N'd93397be-a098-46c2-9a41-7db4159e9fa5', N'65ed9fd3-d897-4339-86bb-89b6607b1080', N'48')
/****** Object:  Table [dbo].[Clinical]    Script Date: 06/10/2009 15:30:00 ******/
INSERT [dbo].[Clinical] ([Id], [PatientId], [DiagnosisId], [TargetINR], [Start],[End], [TreatmentDuration], [IsTreatmentDurationIndefinite], [MaxReview], [Use5], [Use3], [Use1], [UseHalfTablets], [DosingMethod], [NPSA], [UseSplit],  [AnnualReview], [TestingMethod], [WrittenInfoProvided]) VALUES (N'2cf8eb9b-0f85-4fc8-ad56-91fb5f269141', N'674b5df3-9763-44ab-88d1-385b24728811', N'09e47469-d231-41d4-a8bd-1a2d344941f7', 2.5, CAST(0x99A40000 AS SmallDateTime),NULL, NULL, 1, 32, 1, 1, 1, 1, N'Coventry Maintenance', 1, 0, NULL, N'NPT', 0)
INSERT [dbo].[SiteStatus] ([Id], [Message])VALUES (N'46DA6D91-1779-44D1-93EF-CB01DF9068F1', N'')
-- Add a patient modified record for all the existing patients
DECLARE @PatientId UNIQUEIDENTIFIER
DECLARE PatientCursor CURSOR FOR 
SELECT [Id]
FROM [ASPNETDB].[dbo].[PatientTable]
OPEN PatientCursor
FETCH NEXT FROM PatientCursor INTO @PatientId
WHILE @@FETCH_STATUS = 0
BEGIN
      IF NOT EXISTS
            (SELECT PatientId 
            FROM [ASPNETDB].[dbo].[PatientRecord] 
            WHERE PatientId = @PatientId)
      INSERT INTO [ASPNETDB].[dbo].[PatientRecord]
            ([ID], [PatientId], [Modified])
      VALUES
            (NEWID(), @PatientId, NEWID())

      FETCH NEXT FROM PatientCursor INTO @PatientId
END
CLOSE PatientCursor
DEALLOCATE PatientCursor
