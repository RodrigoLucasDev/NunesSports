using Microsoft.AspNetCore.Mvc;

namespace NunesSportsAPI.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Bem-vindo à API Nunes Sports!");
        }
    }
}
