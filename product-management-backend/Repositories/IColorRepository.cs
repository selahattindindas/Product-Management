using product_management_backend.Models;

namespace product_management_backend.Repositories
{
    public interface IColorRepository
    {
        Task<Color?> GetByIdAsync(int id);
        Task<IEnumerable<Color>> GetAllAsync();
        Task<Color> CreateAsync(Color color);
        Task<Color> UpdateAsync(Color color);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<bool> HasProductVariantsAsync(int colorId);
    }
}

