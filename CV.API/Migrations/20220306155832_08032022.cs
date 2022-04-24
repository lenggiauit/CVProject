using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CV.API.Migrations
{
    public partial class _08032022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Template_Control_LayoutId",
                table: "Template");

            migrationBuilder.DropIndex(
                name: "IX_Template_LayoutId",
                table: "Template");

            migrationBuilder.DropColumn(
                name: "LayoutId",
                table: "Template");

            migrationBuilder.DropColumn(
                name: "PackagePath",
                table: "Template");

            migrationBuilder.AddColumn<string>(
                name: "Package",
                table: "Template",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Control",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Control",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TemplateId",
                table: "Control",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CSSContent",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedBy = table.Column<Guid>(nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<Guid>(nullable: true),
                    TemplateId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CSSContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CSSContent_Template_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Template",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Language",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedBy = table.Column<Guid>(nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<Guid>(nullable: true),
                    TemplateId = table.Column<Guid>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Language", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Language_Template_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Template",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Control_TemplateId",
                table: "Control",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_CSSContent_TemplateId",
                table: "CSSContent",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Language_TemplateId",
                table: "Language",
                column: "TemplateId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Control_Template_TemplateId",
            //    table: "Control",
            //    column: "TemplateId",
            //    principalTable: "Template",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Control_Template_TemplateId",
                table: "Control");

            migrationBuilder.DropTable(
                name: "CSSContent");

            migrationBuilder.DropTable(
                name: "Language");

            migrationBuilder.DropIndex(
                name: "IX_Control_TemplateId",
                table: "Control");

            migrationBuilder.DropColumn(
                name: "Package",
                table: "Template");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "Control");

            migrationBuilder.AddColumn<Guid>(
                name: "LayoutId",
                table: "Template",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PackagePath",
                table: "Template",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Control",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Control",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Template_LayoutId",
                table: "Template",
                column: "LayoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_Template_Control_LayoutId",
                table: "Template",
                column: "LayoutId",
                principalTable: "Control",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
