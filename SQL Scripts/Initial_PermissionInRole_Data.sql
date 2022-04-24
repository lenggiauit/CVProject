 
GO

Declare @RoleId uniqueidentifier;

SELECT @RoleId = Id from Role where name = 'Administrator'

 
INSERT INTO [dbo].[PermissionInRole]
           ([Id]
           ,[PermissionId]
           ,[RoleId])
     SELECT NEWID(), Id, @RoleId from Permission  
GO


