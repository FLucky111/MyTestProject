using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySite.Api.Data;

namespace MySite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    //Информация об авторизированном пользователе
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdValue))
            return Unauthorized();

        var userId = int.Parse(userIdValue);

        var user = await _context.Users
            .Where(x => x.Id == userId)
            .Select(x => new
            {
                x.Id,
                x.UserName,
                x.Email
            })
            .FirstOrDefaultAsync();

        if (user == null)
            return NotFound();

        return Ok(user);
    }
    
    [Authorize]
    [HttpGet("debug-auth")]
    public IActionResult DebugAuth()
    {
        return Ok(new
        {
            isAuthenticated = User.Identity?.IsAuthenticated,
            name = User.Identity?.Name,
            claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList()
        });
    }
}