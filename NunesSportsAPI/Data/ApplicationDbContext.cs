using Microsoft.EntityFrameworkCore;
using NunesSportsAPI.Models;

namespace NunesSportsAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>()
            .HasKey(p => p.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
