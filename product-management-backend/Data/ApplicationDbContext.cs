using Microsoft.EntityFrameworkCore;
using product_management_backend.Models;

namespace product_management_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
            });

            // Category entity configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            });

            // Product entity configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.HasOne(e => e.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(e => e.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // ProductColor entity configuration
            modelBuilder.Entity<ProductColor>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Product)
                      .WithMany(p => p.ProductColors)
                      .HasForeignKey(e => e.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Color)
                      .WithMany()
                      .HasForeignKey(e => e.ColorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });


            // Color entity configuration
            modelBuilder.Entity<Color>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ColorCode).HasMaxLength(7);
            });

            // Seed data will be added after database creation
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            var seedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", CreatedAt = seedDate },
                new Category { Id = 2, Name = "Clothing", CreatedAt = seedDate },
                new Category { Id = 3, Name = "Books", CreatedAt = seedDate },
                new Category { Id = 4, Name = "Home & Garden", CreatedAt = seedDate }
            );

            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User 
                { 
                    Id = 1, 
                    Email = "admin@example.com", 
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), 
                    Role = "Admin",
                    CreatedAt = seedDate
                },
                new User 
                { 
                    Id = 2, 
                    Email = "user1@example.com", 
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("user123"), 
                    Role = "User",
                    CreatedAt = seedDate
                }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product 
                { 
                    Id = 1, 
                    Name = "Laptop", 
                    Description = "High-performance laptop", 
                    Price = 999.99m, 
                    CategoryId = 1, 
                    CreatedAt = seedDate
                },
                new Product 
                { 
                    Id = 2, 
                    Name = "Mouse", 
                    Description = "Wireless mouse", 
                    Price = 29.99m, 
                    CategoryId = 1, 
                    CreatedAt = seedDate
                },
                new Product 
                { 
                    Id = 3, 
                    Name = "Keyboard", 
                    Description = "Mechanical keyboard", 
                    Price = 89.99m, 
                    CategoryId = 1, 
                    CreatedAt = seedDate
                }
            );

            // Seed Colors
            modelBuilder.Entity<Color>().HasData(
                new Color { Id = 1, Name = "Kırmızı", ColorCode = "#FF0000", CreatedAt = seedDate },
                new Color { Id = 2, Name = "Mavi", ColorCode = "#0000FF", CreatedAt = seedDate },
                new Color { Id = 3, Name = "Yeşil", ColorCode = "#00FF00", CreatedAt = seedDate },
                new Color { Id = 4, Name = "Sarı", ColorCode = "#FFFF00", CreatedAt = seedDate },
                new Color { Id = 5, Name = "Siyah", ColorCode = "#000000", CreatedAt = seedDate },
                new Color { Id = 6, Name = "Beyaz", ColorCode = "#FFFFFF", CreatedAt = seedDate }
            );
        }
    }
}
