using product_management_backend.Models.DTOs;

namespace product_management_backend.Services
{
    public interface IColorService
    {
        Task<IEnumerable<ColorDto>> GetAllColorsAsync();
        Task<ColorDto?> GetColorByIdAsync(int id);
        Task<ColorDto> CreateColorAsync(CreateColorRequest request);
        Task<ColorDto> UpdateColorAsync(int id, UpdateColorRequest request);
        Task DeleteColorAsync(int id);
    }
}

