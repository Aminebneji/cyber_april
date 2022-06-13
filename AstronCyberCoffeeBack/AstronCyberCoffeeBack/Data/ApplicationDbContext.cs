using AstronCyberCoffeeBack.Models;
using Microsoft.EntityFrameworkCore;
#pragma warning disable
namespace AstronCyberCoffeeBack.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<PC> PCs { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
       

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
