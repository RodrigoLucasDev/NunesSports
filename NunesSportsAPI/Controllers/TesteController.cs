using Microsoft.AspNetCore.Mvc;
using NunesSportsAPI.Data;

namespace NunesSportsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TesteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TesteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Rota para enviar dados ao backend
        [HttpPost("enviar-dados")]
        public IActionResult PostData([FromBody] Produto produto)
        {
            // Aqui você pode salvar o produto no banco de dados ou processar como quiser
            _context.Produtos.Add(produto);
            _context.SaveChanges();
            return Ok(new { message = "Dados recebidos com sucesso!" });
        }
    }
}
