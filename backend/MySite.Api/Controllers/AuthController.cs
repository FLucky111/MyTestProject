using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySite.Api.Data;
using MySite.Api.DTO;
using MySite.Api.Models;
using MySite.Api.Services;

namespace MySite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var emailExists = await _context.Users.AnyAsync(x => x.Email == dto.Email);
        if (emailExists)
            return BadRequest(new { message = "Пользователь с таким email уже существует" });

        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.CreateToken(user);

        return Ok(new
        {
            token,
            user = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email
            }
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (user == null)
            return Unauthorized(new { message = "Неверный email или пароль" });

        var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!passwordValid)
            return Unauthorized(new { message = "Неверный email или пароль" });

        var token = _tokenService.CreateToken(user);

        return Ok(new
        {
            token,
            user = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email
            }
        });
    }
}