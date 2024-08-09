using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Servico.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace Cod3rsGrowth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceitasController : ControllerBase
    {
        private ServicoReceita _servicoReceita;

        public ReceitasController()
        {
            CarragarDados();
        }

        private void CarragarDados()
        {
            _servicoReceita = _serviceProvider.GetService<ServicoReceita>()
                ?? throw new Exception($"Erro ao obter servico [{nameof(ServicoReceita)}]");
        }

        [HttpGet]
        public IActionResult ObterTodos([FromQuery] FiltroReceita filtroReceita)
        {
           return  Ok(_servicoReceita.ObterTodos(filtroReceita));
        }
        
        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            return  Ok(_servicoReceita.ObterPorId(id));
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Receita receita)
        {
            int id = _servicoReceita.Criar(receita);

            return CreatedAtAction(nameof(ObterPorId), new { id = id }, receita);
        }

        [HttpPatch]
        public IActionResult Editar([FromBody] Receita receita)
        {
            return Ok(_servicoReceita.Editar(receita));
        }

        [HttpDelete("{id}")]
        public IActionResult Remover(int id)
        {
            _servicoReceita.Remover(id);

            return NoContent();
        }
    }
}
