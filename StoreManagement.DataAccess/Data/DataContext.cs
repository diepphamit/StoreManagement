using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace StoreManagement.DataAccess.Data
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        
        public DbSet<Branch> Branches { get; set; }
        public DbSet<BranchProduct> BranchProducts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
        public DbSet<UserPermission> UserPermissions { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<PermissionDetail> PermissionDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var hmac = new HMACSHA512();

            builder.Entity<GroupUser>().HasData(new GroupUser { Id = 1, Name = "Admin" });
            builder.Entity<GroupUser>().HasData(new GroupUser { Id = 2, Name = "Staff" });
            builder.Entity<GroupUser>().HasData(new GroupUser { Id = 3, Name = "Customer" });
            builder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@admin.com",
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("12345678")),
                GroupUserId = 1
            }) ;

            builder.Entity<Order>(x =>
            {
                x.HasOne(x => x.Staff)
                    .WithMany()
                    .HasForeignKey(y => y.StaffId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .IsRequired();

                x.HasOne(x => x.Customer)
                    .WithMany()
                    .HasForeignKey(y => y.CustomerId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<DataContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new DataContext(builder.Options);
        }
    }
}
