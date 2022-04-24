USE [ProjectManagement]
GO
 
INSERT INTO [dbo].[ProjectStatus]
           ([Id]
           ,[Name]
           ,[Description]
           ,[IsActive]
           ,[CreatedDate]
		   ,[IsDefault]
           )
     VALUES
	 ( NEWID()
           , 'NEW'
           , 'New'
           , 1
           , GETDATE(),
		   1
           ),
           ( NEWID()
           , 'OPEN'
           , 'Open'
           , 1
           , GETDATE()
		   ,0
           ),
		   ( NEWID()
           , 'Hold'
           , 'Hold'
           , 1
           , GETDATE()
		   ,0
           ),
		   ( NEWID()
           , 'Closed'
           , 'Closed'
           , 1
           , GETDATE()
           ,0)
GO


