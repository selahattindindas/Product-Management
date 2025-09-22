using System.ComponentModel.DataAnnotations;

namespace product_management_backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
                
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation property
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}



