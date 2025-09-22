using product_management_backend.Constants;
using product_management_backend.Models;
using product_management_backend.Models.DTOs;
using product_management_backend.Repositories;

namespace product_management_backend.Services
{
    public class ColorService : IColorService
    {
        private readonly IColorRepository _colorRepository;

        public ColorService(IColorRepository colorRepository)
        {
            _colorRepository = colorRepository;
        }

        public async Task<IEnumerable<ColorDto>> GetAllColorsAsync()
        {
            var colors = await _colorRepository.GetAllAsync();
            
            return colors.Select(c => new ColorDto
            {
                Id = c.Id,
                Name = c.Name,
                ColorCode = c.ColorCode,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            });
        }

        public async Task<ColorDto?> GetColorByIdAsync(int id)
        {
            var color = await _colorRepository.GetByIdAsync(id);
            if (color == null)
            {
                return null;
            }

            return new ColorDto
            {
                Id = color.Id,
                Name = color.Name,
                ColorCode = color.ColorCode,
                CreatedAt = color.CreatedAt,
                UpdatedAt = color.UpdatedAt
            };
        }

        public async Task<ColorDto> CreateColorAsync(CreateColorRequest request)
        {
            var newColor = new Color
            {
                Name = request.Name,
                ColorCode = request.ColorCode,
                CreatedAt = DateTime.UtcNow
            };

            var createdColor = await _colorRepository.CreateAsync(newColor);

            return new ColorDto
            {
                Id = createdColor.Id,
                Name = createdColor.Name,
                ColorCode = createdColor.ColorCode,
                CreatedAt = createdColor.CreatedAt,
                UpdatedAt = createdColor.UpdatedAt
            };
        }

        public async Task<ColorDto> UpdateColorAsync(int id, UpdateColorRequest request)
        {
            var color = await _colorRepository.GetByIdAsync(id);
            if (color == null)
            {
                throw new KeyNotFoundException(Messages.COLOR_NOT_FOUND);
            }

            color.Name = request.Name;
            color.ColorCode = request.ColorCode;
            color.UpdatedAt = DateTime.UtcNow;

            var updatedColor = await _colorRepository.UpdateAsync(color);

            return new ColorDto
            {
                Id = updatedColor.Id,
                Name = updatedColor.Name,
                ColorCode = updatedColor.ColorCode,
                CreatedAt = updatedColor.CreatedAt,
                UpdatedAt = updatedColor.UpdatedAt
            };
        }

        public async Task DeleteColorAsync(int id)
        {
            var color = await _colorRepository.GetByIdAsync(id);
            if (color == null)
            {
                throw new KeyNotFoundException(Messages.COLOR_NOT_FOUND);
            }

            var hasVariants = await _colorRepository.HasProductVariantsAsync(id);
            if (hasVariants)
            {
                throw new InvalidOperationException(Messages.COLOR_HAS_VARIANTS);
            }

            await _colorRepository.DeleteAsync(id);
        }
    }
}

