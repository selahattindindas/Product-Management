using Microsoft.EntityFrameworkCore;
using product_management_backend.Constants;
using product_management_backend.Data;
using product_management_backend.Models;
using product_management_backend.Models.DTOs;
using product_management_backend.Repositories;

namespace product_management_backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ApplicationDbContext _context;

        public ProductService(IProductRepository productRepository, ApplicationDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.Color)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    ProductColors = p.ProductColors.Select(pc => new ProductColorDto
                    {
                        Id = pc.Id,
                        ColorId = pc.ColorId,
                        ColorName = pc.Color.Name,
                        ColorCode = pc.Color.ColorCode,
                        CreatedAt = pc.CreatedAt
                    }).ToList(),
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .ToListAsync();

            return products;
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.Color)
                .Where(p => p.Id == id)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    ProductColors = p.ProductColors.Select(pc => new ProductColorDto
                    {
                        Id = pc.Id,
                        ColorId = pc.ColorId,
                        ColorName = pc.Color.Name,
                        ColorCode = pc.Color.ColorCode,
                        CreatedAt = pc.CreatedAt
                    }).ToList(),
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .FirstOrDefaultAsync();

            return product;
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductRequest request)
        {
            // Validate category exists
            var category = await _context.Categories.FindAsync(request.CategoryId);
            if (category == null)
            {
                throw new KeyNotFoundException(Messages.CATEGORY_NOT_FOUND);
            }

            // Validate colors exist
            var existingColors = await _context.Colors
                .Where(c => request.ColorIds.Contains(c.Id))
                .ToListAsync();

            if (existingColors.Count != request.ColorIds.Count)
            {
                throw new KeyNotFoundException(Messages.COLOR_NOT_FOUND);
            }

            var newProduct = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                CategoryId = request.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            var createdProduct = await _productRepository.CreateAsync(newProduct);

            // Add product colors
            var productColors = request.ColorIds.Select(colorId => new ProductColor
            {
                ProductId = createdProduct.Id,
                ColorId = colorId,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            _context.ProductColors.AddRange(productColors);
            await _context.SaveChangesAsync();

            // Return the created product with all relations
            var result = await GetProductByIdAsync(createdProduct.Id);
            return result!;
        }

        public async Task<ProductDto> UpdateProductAsync(int id, UpdateProductRequest request)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException(Messages.PRODUCT_NOT_FOUND);
            }

            // Validate category exists
            var category = await _context.Categories.FindAsync(request.CategoryId);
            if (category == null)
            {
                throw new KeyNotFoundException(Messages.CATEGORY_NOT_FOUND);
            }

            // Validate colors exist
            var existingColors = await _context.Colors
                .Where(c => request.ColorIds.Contains(c.Id))
                .ToListAsync();

            if (existingColors.Count != request.ColorIds.Count)
            {
                throw new KeyNotFoundException(Messages.COLOR_NOT_FOUND);
            }

            // Update product properties
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.CategoryId = request.CategoryId;
            product.UpdatedAt = DateTime.UtcNow;

            // Remove existing product colors
            var existingProductColors = await _context.ProductColors
                .Where(pc => pc.ProductId == id)
                .ToListAsync();
            _context.ProductColors.RemoveRange(existingProductColors);

            // Add new product colors
            var productColors = request.ColorIds.Select(colorId => new ProductColor
            {
                ProductId = id,
                ColorId = colorId,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            _context.ProductColors.AddRange(productColors);

            var updatedProduct = await _productRepository.UpdateAsync(product);

            // Return the updated product with all relations
            var result = await GetProductByIdAsync(updatedProduct.Id);
            return result!;
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException(Messages.PRODUCT_NOT_FOUND);
            }

            await _productRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)
            {
                throw new KeyNotFoundException(Messages.CATEGORY_NOT_FOUND);
            }

            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.Color)
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    ProductColors = p.ProductColors.Select(pc => new ProductColorDto
                    {
                        Id = pc.Id,
                        ColorId = pc.ColorId,
                        ColorName = pc.Color.Name,
                        ColorCode = pc.Color.ColorCode,
                        CreatedAt = pc.CreatedAt
                    }).ToList(),
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .ToListAsync();

            return products;
        }

        public async Task<PaginatedProductsResponse> GetPaginatedProductsAsync(int page, int pageSize)
        {
            var totalCount = await _context.Products.CountAsync();
            
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.Color)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    ProductColors = p.ProductColors.Select(pc => new ProductColorDto
                    {
                        Id = pc.Id,
                        ColorId = pc.ColorId,
                        ColorName = pc.Color.Name,
                        ColorCode = pc.Color.ColorCode,
                        CreatedAt = pc.CreatedAt
                    }).ToList(),
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .ToListAsync();

            return new PaginatedProductsResponse
            {
                Products = products,
                TotalCount = totalCount
            };
        }
    }
}

