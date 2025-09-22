using System.ComponentModel.DataAnnotations;

namespace product_management_backend.Models
{
    public class Color
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(7)] // #RRGGBB format için
        public string? ColorCode { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}

