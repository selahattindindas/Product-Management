using System.ComponentModel.DataAnnotations;

namespace product_management_backend.Models.DTOs
{
    public class ColorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ColorCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateColorRequest
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(7)]
        public string? ColorCode { get; set; }
    }

    public class UpdateColorRequest
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(7)]
        public string? ColorCode { get; set; }
    }
}

