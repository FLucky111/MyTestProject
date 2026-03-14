using Microsoft.AspNetCore.Mvc;

namespace MySite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            status = "ok",
            message = "API работает",
            time = DateTime.UtcNow
        });
    }
}