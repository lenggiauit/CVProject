
GO
--- Delete from [dbo].[Permission]
--- Select * from [dbo].[Permission]
INSERT INTO [dbo].[Permission]
           ([Id]
           ,[Name]
           ,[Code]
           ,[Description]
           ,[IsActive]
           ,[CreatedDate] )
     VALUES
           (NEWID()
           ,'Create a team'
           ,'CreateTeam'
           ,'Create a team'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'Get all team'
           ,'GetAllTeam'
           ,'Get all team'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'Delete a team'
           ,'DeleteTeam'
           ,'Delete a team'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'Invite team member'
           ,'InviteTeamMember'
           ,'Invite team member'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'Remove team member'
           ,'RemoveTeamMember'
           ,'Remove team member'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'Update team member'
           ,'UpdateTeamMember'
           ,'Update team member'
           ,1
           ,GETDATE()
            ), 
			(NEWID()
			   ,'Add New Project'
			   ,'AddNewProject'
			   ,'Add New Project'
			   ,1
			   ,GETDATE()
            ), 
			(NEWID()
			   ,'Update Project'
			   ,'UpdateProject'
			   ,'Update Project Detail'
			   ,1
			   ,GETDATE()
            ),
			(NEWID()
			   ,'Delete Project'
			   ,'DeleteProject'
			   ,'Delete Project Detail'
			   ,1
			   ,GETDATE()
            ),
			(NEWID()
			   ,'Get Project list'
			   ,'GetProjectList'
			   ,'Get Project list'
			   ,1
			   ,GETDATE()
            ), 
			(NEWID()
			   ,'Get Project list by user'
			   ,'GetProjectListByUser'
			   ,'Get Project list by user'
			   ,1
			   ,GETDATE()
            ),
			(NEWID()
			   ,'CreateTemplateType'
			   ,'CreateTemplateType'
			   ,'CreateTemplateType'
			   ,1
			   ,GETDATE()
            ) ,
			(NEWID()
			   ,'UploadTemplate'
			   ,'UploadTemplate'
			   ,'UploadTemplate'
			   ,1
			   ,GETDATE()
            ) 
			,
			(NEWID()
			   ,'GetTemplateType'
			   ,'GetTemplateType'
			   ,'GetTemplateType'
			   ,1
			   ,GETDATE()
            ) 
			,
			(NEWID()
			   ,'GetTemplate'
			   ,'GetTemplate'
			   ,'GetTemplate'
			   ,1
			   ,GETDATE()
            ) 
			 
			 
GO


