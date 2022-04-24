using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CV.API.Migrations
{
    public partial class _06032022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Template_TemplateType_TemplateTypeId",
                table: "Template");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateTypeId",
                table: "Template",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PackagePath",
                table: "Template",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Template_TemplateType_TemplateTypeId",
                table: "Template",
                column: "TemplateTypeId",
                principalTable: "TemplateType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Template_TemplateType_TemplateTypeId",
                table: "Template");

            migrationBuilder.DropColumn(
                name: "PackagePath",
                table: "Template");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateTypeId",
                table: "Template",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_Template_TemplateType_TemplateTypeId",
                table: "Template",
                column: "TemplateTypeId",
                principalTable: "TemplateType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
