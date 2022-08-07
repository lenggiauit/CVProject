using Microsoft.EntityFrameworkCore.Migrations;

namespace CV.API.Migrations
{
    public partial class _07032022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<string>(
            //    name: "CssClass",
            //    table: "Control",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "Text",
            //    table: "Control",
            //    nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CssClass",
                table: "Control");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Control");
        }
    }
}
