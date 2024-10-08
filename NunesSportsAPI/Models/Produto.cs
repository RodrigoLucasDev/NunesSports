using System.ComponentModel.DataAnnotations;

namespace NunesSportsAPI.Models
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }  
        public string Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public decimal Total => Preco * Quantidade;
    }
}
