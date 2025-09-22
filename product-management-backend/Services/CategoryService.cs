using Microsoft.EntityFrameworkCore;
using product_management_backend.Constants;
using product_management_backend.Data;
using product_management_backend.Models;
using product_management_backend.Models.DTOs;
using product_management_backend.Repositories;

namespace product_management_backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ApplicationDbContext _context;

        public CategoryService(ICategoryRepository categoryRepository, ApplicationDbContext context)
        {
            _categoryRepository = categoryRepository;
            _context = context;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    ProductCount = c.Products.Count
                })
                .ToListAsync();

            return categories;
        }

        public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    ProductCount = c.Products.Count
                })
                .FirstOrDefaultAsync();

            return category;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryRequest request)
        {
            var newCategory = new Category
            {
                Name = request.Name,
                CreatedAt = DateTime.UtcNow
            };

            var createdCategory = await _categoryRepository.CreateAsync(newCategory);

            return new CategoryDto
            {
                Id = createdCategory.Id,
                Name = createdCategory.Name,
                CreatedAt = createdCategory.CreatedAt,
                UpdatedAt = createdCategory.UpdatedAt,
                ProductCount = 0
            };
        }

        public async Task<CategoryDto> UpdateCategoryAsync(int id, UpdateCategoryRequest request)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                throw new KeyNotFoundException(Messages.CATEGORY_NOT_FOUND);
            }

            category.Name = request.Name;
            category.UpdatedAt = DateTime.UtcNow;

            var updatedCategory = await _categoryRepository.UpdateAsync(category);

            return new CategoryDto
            {
                Id = updatedCategory.Id,
                Name = updatedCategory.Name,
                CreatedAt = updatedCategory.CreatedAt,
                UpdatedAt = updatedCategory.UpdatedAt,
                ProductCount = updatedCategory.Products.Count
            };
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                throw new KeyNotFoundException(Messages.CATEGORY_NOT_FOUND);
            }

            var hasProducts = await _categoryRepository.HasProductsAsync(id);
            if (hasProducts)
            {
                throw new InvalidOperationException(Messages.CATEGORY_HAS_PRODUCTS);
            }

            await _categoryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ProductDto>> GetCategoryProductsAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId);
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
    }
}





