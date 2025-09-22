using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using product_management_backend.Models.DTOs;
using product_management_backend.Services;

namespace product_management_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ColorController : ControllerBase
    {
        private readonly IColorService _colorService;

        public ColorController(IColorService colorService)
        {
            _colorService = colorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ColorDto>>> GetColors()
        {
            try
            {
                var colors = await _colorService.GetAllColorsAsync();
                return Ok(colors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ColorDto>> GetColor(int id)
        {
            try
            {
                var color = await _colorService.GetColorByIdAsync(id);
                if (color == null)
                {
                    return NotFound();
                }
                return Ok(color);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ColorDto>> CreateColor([FromBody] CreateColorRequest request)
        {
            try
            {
                var color = await _colorService.CreateColorAsync(request);
                return CreatedAtAction(nameof(GetColor), new { id = color.Id }, color);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateColor([FromBody] UpdateColorRequest request)
        {
            try
            {
                await _colorService.UpdateColorAsync(request.Id, request);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            try
            {
                await _colorService.DeleteColorAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}

