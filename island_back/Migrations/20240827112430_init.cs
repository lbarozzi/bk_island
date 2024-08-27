using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace island_back.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityTypes",
                columns: table => new
                {
                    ActivityTypeID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActivityTypeDescription = table.Column<string>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTypes", x => x.ActivityTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    ActivityID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActivityTypeID = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivityCreationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ActivityDueTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ActivityDoneTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    ActivityTargetID = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivityTargetName = table.Column<string>(type: "TEXT", nullable: false),
                    ActivityCreatorID = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivityCreatorName = table.Column<string>(type: "TEXT", nullable: false),
                    ActivityAssigneeID = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivityAssigneeName = table.Column<string>(type: "TEXT", nullable: false),
                    ActivityNotes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.ActivityID);
                    table.ForeignKey(
                        name: "FK_Activities_ActivityTypes_ActivityTypeID",
                        column: x => x.ActivityTypeID,
                        principalTable: "ActivityTypes",
                        principalColumn: "ActivityTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ActivityTypeID",
                table: "Activities",
                column: "ActivityTypeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "ActivityTypes");
        }
    }
}
