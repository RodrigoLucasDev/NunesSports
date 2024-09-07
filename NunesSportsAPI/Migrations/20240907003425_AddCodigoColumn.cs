using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NunesSportsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCodigoColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Alteração manual para adicionar a coluna 'Codigo' após o 'Id'
            migrationBuilder.Sql("ALTER TABLE Produtos ADD COLUMN Codigo VARCHAR(255) NOT NULL AFTER Id;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Codigo",
                table: "Produtos");
        }
    }
}
