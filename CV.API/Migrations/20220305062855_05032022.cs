using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CV.API.Migrations
{
    public partial class _05032022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Comment",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        ParentId = table.Column<Guid>(nullable: false),
            //        Comment = table.Column<string>(nullable: true),
            //        IsDeleted = table.Column<bool>(nullable: true, defaultValueSql: "((0))")
            //    },
            //    constraints: table =>
            //    {
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Control",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(nullable: true),
            //        ParentId = table.Column<Guid>(nullable: false),
            //        Type = table.Column<int>(nullable: false),
            //        Order = table.Column<int>(nullable: false),
            //        EditType = table.Column<int>(nullable: false),
            //        Placeholder = table.Column<string>(nullable: true),
            //        Value = table.Column<string>(nullable: true),
            //        ControlId = table.Column<Guid>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Control", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Control_Control_ControlId",
            //            column: x => x.ControlId,
            //            principalTable: "Control",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Conversation",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Title = table.Column<string>(maxLength: 250, nullable: true),
            //        LastMessage = table.Column<string>(maxLength: 500, nullable: true),
            //        LastMessageDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Conversation", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ConversationMessage",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        ConversationId = table.Column<Guid>(nullable: false),
            //        UserId = table.Column<Guid>(nullable: false),
            //        Message = table.Column<string>(maxLength: 1500, nullable: true),
            //        LovedByUIds = table.Column<string>(maxLength: 1000, nullable: true),
            //        SeenByUIds = table.Column<string>(maxLength: 1000, nullable: true),
            //        SendDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ConversationMessage", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ConversationUsers",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        UserId = table.Column<Guid>(nullable: false),
            //        ConversationId = table.Column<Guid>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ConversationUsers", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Permission",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 50, nullable: true),
            //        Code = table.Column<string>(fixedLength: true, maxLength: 50, nullable: true),
            //        Description = table.Column<string>(maxLength: 250, nullable: true),
            //        IsActive = table.Column<bool>(nullable: true, defaultValueSql: "((1))")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Permission", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Priority",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 250, nullable: true),
            //        Order = table.Column<int>(nullable: true),
            //        Color = table.Column<string>(nullable: true),
            //        IsActive = table.Column<bool>(nullable: true, defaultValueSql: "((1))"),
            //        IsDefault = table.Column<bool>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Priority", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ProjectStatus",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(maxLength: 250, nullable: true),
            //        IsActive = table.Column<bool>(nullable: true, defaultValueSql: "((1))"),
            //        IsDefault = table.Column<bool>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ProjectStatus", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Role",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 50, nullable: true),
            //        Description = table.Column<string>(maxLength: 250, nullable: true),
            //        IsActive = table.Column<bool>(nullable: true),
            //        IsSystemRole = table.Column<bool>(nullable: true, defaultValueSql: "((0))")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Role", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Team",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        IsPublic = table.Column<bool>(nullable: true, defaultValueSql: "((1))"),
            //        IsActive = table.Column<bool>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Team", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "TemplateType",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(maxLength: 250, nullable: true),
            //        IsArchived = table.Column<bool>(nullable: true, defaultValue: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TemplateType", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "TodoStatus",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        IsActive = table.Column<bool>(nullable: true, defaultValueSql: "((1))")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TodoStatus", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "TodoType",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        Color = table.Column<string>(maxLength: 20, nullable: true),
            //        Order = table.Column<int>(nullable: true),
            //        IsActive = table.Column<bool>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TodoType", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Project",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        IsArchived = table.Column<bool>(nullable: true),
            //        StatusId = table.Column<Guid>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Project", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Project_ProjectStatus_StatusId",
            //            column: x => x.StatusId,
            //            principalTable: "ProjectStatus",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PermissionInRole",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        PermissionId = table.Column<Guid>(nullable: false),
            //        RoleId = table.Column<Guid>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PermissionInRole", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_PermissionInRole_Permission_PermissionId",
            //            column: x => x.PermissionId,
            //            principalTable: "Permission",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_PermissionInRole_Role_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "Role",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Template",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 100, nullable: true),
            //        Image = table.Column<string>(nullable: true),
            //        Version = table.Column<string>(nullable: true),
            //        Author = table.Column<string>(nullable: true),
            //        Description = table.Column<string>(maxLength: 250, nullable: true),
            //        TemplateTypeId = table.Column<Guid>(nullable: true),
            //        LayoutId = table.Column<Guid>(nullable: true),
            //        IsArchived = table.Column<bool>(nullable: false, defaultValue: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Template", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Template_Control_LayoutId",
            //            column: x => x.LayoutId,
            //            principalTable: "Control",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Template_TemplateType_TemplateTypeId",
            //            column: x => x.TemplateTypeId,
            //            principalTable: "TemplateType",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "User",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        UserName = table.Column<string>(maxLength: 250, nullable: true),
            //        Password = table.Column<string>(maxLength: 250, nullable: true),
            //        IsActive = table.Column<bool>(nullable: true, defaultValueSql: "((1))"),
            //        Avatar = table.Column<string>(maxLength: 255, nullable: true),
            //        Email = table.Column<string>(maxLength: 250, nullable: true),
            //        RoleId = table.Column<Guid>(nullable: true),
            //        FullName = table.Column<string>(maxLength: 150, nullable: true),
            //        Phone = table.Column<string>(fixedLength: true, maxLength: 20, nullable: true),
            //        JobTitle = table.Column<string>(maxLength: 250, nullable: true),
            //        Address = table.Column<string>(maxLength: 250, nullable: true),
            //        ConversationId = table.Column<Guid>(nullable: true),
            //        ProjectId = table.Column<Guid>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_User", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_User_Conversation_ConversationId",
            //            column: x => x.ConversationId,
            //            principalTable: "Conversation",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_User_Project_ProjectId",
            //            column: x => x.ProjectId,
            //            principalTable: "Project",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_User_Role_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "Role",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Todo",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        Name = table.Column<string>(maxLength: 250, nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        StartDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        EndDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        DueDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        Assignee = table.Column<Guid>(nullable: true),
            //        TodoTypeId = table.Column<Guid>(nullable: true),
            //        TodoStatusId = table.Column<Guid>(nullable: true),
            //        ProjectId = table.Column<Guid>(nullable: true),
            //        PriorityId = table.Column<Guid>(nullable: true),
            //        PositionX = table.Column<int>(nullable: true),
            //        PositionY = table.Column<int>(nullable: true),
            //        PositionW = table.Column<int>(nullable: true),
            //        PositionH = table.Column<int>(nullable: true),
            //        IsArchived = table.Column<bool>(nullable: true),
            //        AssigneeNavigationId = table.Column<Guid>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Todo", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Todo_User_AssigneeNavigationId",
            //            column: x => x.AssigneeNavigationId,
            //            principalTable: "User",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Todo_Priority_PriorityId",
            //            column: x => x.PriorityId,
            //            principalTable: "Priority",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Todo_Project_ProjectId",
            //            column: x => x.ProjectId,
            //            principalTable: "Project",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Todo_TodoStatus_TodoStatusId",
            //            column: x => x.TodoStatusId,
            //            principalTable: "TodoStatus",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_Todo_TodoType_TodoTypeId",
            //            column: x => x.TodoTypeId,
            //            principalTable: "TodoType",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "UserOnProject",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        UserId = table.Column<Guid>(nullable: false),
            //        ProjectId = table.Column<Guid>(nullable: false),
            //        RoleId = table.Column<Guid>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_UserOnProject", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_UserOnProject_Project_ProjectId",
            //            column: x => x.ProjectId,
            //            principalTable: "Project",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_UserOnProject_Role_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "Role",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_UserOnProject_User_UserId",
            //            column: x => x.UserId,
            //            principalTable: "User",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "UserOnTeam",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        CreatedBy = table.Column<Guid>(nullable: true),
            //        CreatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedDate = table.Column<DateTime>(nullable: true),
            //        UpdatedBy = table.Column<Guid>(nullable: true),
            //        UserId = table.Column<Guid>(nullable: true),
            //        TeamId = table.Column<Guid>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_UserOnTeam", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_UserOnTeam_Team_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Team",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_UserOnTeam_User_UserId",
            //            column: x => x.UserId,
            //            principalTable: "User",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Control_ControlId",
            //    table: "Control",
            //    column: "ControlId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PermissionInRole_PermissionId",
            //    table: "PermissionInRole",
            //    column: "PermissionId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PermissionInRole_RoleId",
            //    table: "PermissionInRole",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_StatusId",
            //    table: "Project",
            //    column: "StatusId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Template_LayoutId",
            //    table: "Template",
            //    column: "LayoutId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Template_TemplateTypeId",
            //    table: "Template",
            //    column: "TemplateTypeId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Todo_AssigneeNavigationId",
            //    table: "Todo",
            //    column: "AssigneeNavigationId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Todo_PriorityId",
            //    table: "Todo",
            //    column: "PriorityId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Todo_ProjectId",
            //    table: "Todo",
            //    column: "ProjectId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Todo_TodoStatusId",
            //    table: "Todo",
            //    column: "TodoStatusId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Todo_TodoTypeId",
            //    table: "Todo",
            //    column: "TodoTypeId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_User_ConversationId",
            //    table: "User",
            //    column: "ConversationId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_User_ProjectId",
            //    table: "User",
            //    column: "ProjectId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_User_RoleId",
            //    table: "User",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserOnProject_ProjectId",
            //    table: "UserOnProject",
            //    column: "ProjectId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserOnProject_RoleId",
            //    table: "UserOnProject",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserOnProject_UserId",
            //    table: "UserOnProject",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserOnTeam_TeamId",
            //    table: "UserOnTeam",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserOnTeam_UserId",
            //    table: "UserOnTeam",
            //    column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "ConversationMessage");

            migrationBuilder.DropTable(
                name: "ConversationUsers");

            migrationBuilder.DropTable(
                name: "PermissionInRole");

            migrationBuilder.DropTable(
                name: "Template");

            migrationBuilder.DropTable(
                name: "Todo");

            migrationBuilder.DropTable(
                name: "UserOnProject");

            migrationBuilder.DropTable(
                name: "UserOnTeam");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "Control");

            migrationBuilder.DropTable(
                name: "TemplateType");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropTable(
                name: "TodoStatus");

            migrationBuilder.DropTable(
                name: "TodoType");

            migrationBuilder.DropTable(
                name: "Team");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Conversation");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "ProjectStatus");
        }
    }
}
