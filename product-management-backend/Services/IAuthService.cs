using product_management_backend.Models;
using product_management_backend.Models.DTOs;

namespace product_management_backend.Services
{
    public interface IAuthService
    {
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto?> GetUserProfileAsync(int userId);
        string GenerateJwtToken(User user);
    }
}
