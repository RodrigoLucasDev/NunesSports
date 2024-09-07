using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using NunesSportsAPI.Models;
using NunesSportsAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ProdutosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProdutosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Método auxiliar para buscar produto pelo ID e lidar com o caso de não encontrado
    private async Task<ActionResult<Produto>> GetProdutoById(int id)
    {
        var produtoEncontrado = await _context.Produtos.FindAsync(id);
        if (produtoEncontrado == null)
        {
            return NotFound();
        }
        return produtoEncontrado;
    }

    // GET: api/produtos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
    {
        return await _context.Produtos.ToListAsync();
    }

    // GET: api/produtos/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetProduto(int id)
    {
        return await GetProdutoById(id);
    }

    // POST: api/produtos
    [HttpPost]
    public async Task<ActionResult<Produto>> PostProduto(Produto produto)
    {
        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
    }

    // PUT: api/produtos/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduto(int id, Produto produto)
    {
        if (id != produto.Id)
        {
            return BadRequest();
        }

        _context.Entry(produto).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            var produtoExiste = await GetProdutoById(id);
            if (produtoExiste.Result is NotFoundResult)
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/produtos/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        var produtoExiste = await GetProdutoById(id);
        if (produtoExiste.Result is NotFoundResult)
        {
            return NotFound();
        }

        _context.Produtos.Remove(produtoExiste.Value);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Validação auxiliar (ainda opcional para simplificação)
    private bool ProdutoExists(int id)
    {
        return _context.Produtos.Any(e => e.Id == id);
    }
}