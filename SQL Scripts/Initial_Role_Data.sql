 
 
INSERT INTO [dbo].[Role]
           ([Id]
           ,[Name]
           ,[Description]
           ,[IsActive]
		   ,[IsSystemRole]
           ,[CreatedDate] )
     VALUES
           ( NEWID()
           ,'Administrator'
           ,'Administrator role has full permission'
           , 1
		   , 1
           , GETDATE()),
		   ( NEWID()
           ,'Mod'
           ,'Member role has some permission'
           , 1
		   , 1
           , GETDATE()),
		    ( NEWID()
           ,'Member'
           ,'Member role has some permission'
           , 1
		   , 1
           , GETDATE())  
GO

