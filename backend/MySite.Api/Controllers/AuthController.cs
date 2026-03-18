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

    /// <summary>
    /// Регистрация
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        //Проврка на дублирование email и UserName
        var emailExists = await _context.Users.AnyAsync(x => x.Email == dto.Email);
        if (emailExists)
            return BadRequest(new { message = "Пользователь с таким email уже существует" });
        
        var userNameExists = await _context.Users.AnyAsync(x => x.UserName == dto.UserName);
        if (userNameExists)
            return BadRequest(new { message = "Пользователь с таким именем уже существует" });

        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            //Хеширование пароля
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        //Добавление пользователя в БД
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        //Создание токена
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
    
    /// <summary>
    /// Аутентификация
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        //Проверка логина (email) и пароля
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (user == null)
            return Unauthorized(new { message = "Неверный email или пароль" });

        var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!passwordValid)
            return Unauthorized(new { message = "Неверный email или пароль" });

        //Создание токена
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