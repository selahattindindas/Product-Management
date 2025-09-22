using Microsoft.EntityFrameworkCore;
using product_management_backend.Data;
using product_management_backend.Models;

namespace product_management_backend.Repositories
{
    public class ColorRepository : IColorRepository
    {
        private readonly ApplicationDbContext _context;

        public ColorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Color?> GetByIdAsync(int id)
        {
            return await _context.Colors.FindAsync(id);
        }

        public async Task<IEnumerable<Color>> GetAllAsync()
        {
            return await _context.Colors.ToListAsync();
        }

        public async Task<Color> CreateAsync(Color color)
        {
            _context.Colors.Add(color);
            await _context.SaveChangesAsync();
            return color;
        }

        public async Task<Color> UpdateAsync(Color color)
        {
            _context.Colors.Update(color);
            await _context.SaveChangesAsync();
            return color;
        }

        public async Task DeleteAsync(int id)
        {
            var color = await _context.Colors.FindAsync(id);
            if (color != null)
            {
                _context.Colors.Remove(color);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Colors.AnyAsync(c => c.Id == id);
        }

        public async Task<bool> HasProductVariantsAsync(int colorId)
        {
            return await _context.ProductColors.AnyAsync(pc => pc.ColorId == colorId);
        }
    }
}

