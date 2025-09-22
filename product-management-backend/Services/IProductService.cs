using product_management_backend.Models.DTOs;

namespace product_management_backend.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<ProductDto> CreateProductAsync(CreateProductRequest request);
        Task<ProductDto> UpdateProductAsync(int id, UpdateProductRequest request);
        Task DeleteProductAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId);
        Task<PaginatedProductsResponse> GetPaginatedProductsAsync(int page, int pageSize);
    }
}

