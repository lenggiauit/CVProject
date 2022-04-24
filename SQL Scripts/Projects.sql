USE [ProjectManagement]
GO

INSERT INTO [dbo].[Project]
           ([Id]
           ,[Name]
           ,[Description]
           ,[IsArchived]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[StatusId] )
     VALUES
           ( NEWID()
           , 'Project 1'
           , 'Project 1 description'
           , 0
           , '22B81C6B-2BA8-4376-BD11-8C8C8297BF16'
		   , GETDATE()
		   , '233ED51E-1CBB-42FB-8DF7-6DB4F93D0690'
           ),
		    ( NEWID()
           , 'Project 2'
           , 'Project 2 description'
           , 0
           , '22B81C6B-2BA8-4376-BD11-8C8C8297BF16'
		   , GETDATE()
		   , '233ED51E-1CBB-42FB-8DF7-6DB4F93D0690'
           ),
		    ( NEWID()
           , 'Project 3'
           , 'Project 3 description'
           , 0
           , '22B81C6B-2BA8-4376-BD11-8C8C8297BF16'
		   , GETDATE()
		   , '233ED51E-1CBB-42FB-8DF7-6DB4F93D0690'
           ),
		    ( NEWID()
           , 'Project 4'
           , 'Project 4 description'
           , 0
           , '22B81C6B-2BA8-4376-BD11-8C8C8297BF16'
		   , GETDATE()
		   , '233ED51E-1CBB-42FB-8DF7-6DB4F93D0690'
           ),
		    ( NEWID()
           , 'Project 5'
           , 'Project 5 description'
           , 0
           , '22B81C6B-2BA8-4376-BD11-8C8C8297BF16'
		   , GETDATE()
		   , '233ED51E-1CBB-42FB-8DF7-6DB4F93D0690'
           )

GO


