using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreManagement.DataAccess.Migrations
{
    public partial class ChangePicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Pictures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileLocation",
                table: "Pictures",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Pictures",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Size",
                table: "Pictures",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedTime",
                table: "Pictures",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 12, 38, 171, 162, 60, 130, 207, 142, 131, 173, 64, 4, 188, 126, 248, 157, 106, 144, 33, 110, 234, 132, 251, 223, 237, 249, 22, 192, 34, 24, 147, 115, 168, 57, 48, 245, 17, 58, 115, 198, 199, 168, 100, 251, 64, 198, 99, 7, 77, 248, 58, 177, 88, 238, 82, 155, 154, 25, 117, 209, 250, 235, 111, 77 }, new byte[] { 251, 250, 127, 86, 240, 206, 36, 46, 122, 0, 228, 97, 198, 41, 59, 39, 203, 168, 20, 89, 35, 242, 212, 32, 204, 154, 84, 209, 191, 233, 177, 26, 224, 192, 170, 146, 242, 178, 27, 52, 225, 188, 250, 127, 117, 144, 102, 51, 207, 153, 89, 103, 183, 181, 179, 129, 3, 101, 29, 207, 236, 39, 94, 166, 239, 174, 116, 136, 10, 197, 119, 241, 221, 248, 236, 152, 66, 240, 214, 172, 44, 214, 151, 5, 80, 95, 229, 218, 143, 250, 229, 63, 222, 144, 244, 182, 131, 76, 138, 21, 76, 155, 151, 83, 239, 180, 60, 76, 209, 218, 234, 46, 210, 76, 47, 177, 96, 113, 98, 96, 85, 53, 254, 106, 243, 116, 147, 164 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "FileLocation",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "UploadedTime",
                table: "Pictures");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 232, 5, 48, 174, 143, 93, 235, 196, 161, 196, 120, 35, 159, 119, 14, 95, 176, 12, 207, 98, 9, 195, 232, 163, 175, 150, 167, 166, 234, 166, 43, 162, 252, 141, 163, 131, 40, 35, 109, 131, 7, 60, 30, 189, 45, 207, 191, 177, 239, 207, 5, 4, 45, 123, 110, 60, 160, 239, 27, 163, 224, 107, 62, 176 }, new byte[] { 0, 5, 195, 85, 148, 0, 140, 254, 13, 5, 153, 62, 232, 37, 4, 163, 13, 177, 217, 113, 87, 188, 174, 234, 109, 52, 205, 122, 170, 60, 35, 175, 184, 210, 121, 220, 135, 109, 246, 137, 77, 54, 242, 71, 67, 68, 106, 41, 214, 181, 20, 118, 29, 207, 157, 5, 49, 252, 150, 31, 45, 178, 115, 49, 71, 108, 228, 133, 140, 50, 108, 151, 51, 245, 183, 156, 37, 108, 68, 116, 140, 36, 146, 203, 207, 102, 213, 187, 187, 251, 140, 161, 244, 196, 183, 95, 65, 93, 199, 71, 155, 214, 34, 50, 18, 173, 164, 100, 107, 110, 215, 64, 224, 35, 235, 237, 2, 114, 22, 230, 39, 175, 110, 88, 89, 34, 28, 104 } });
        }
    }
}
