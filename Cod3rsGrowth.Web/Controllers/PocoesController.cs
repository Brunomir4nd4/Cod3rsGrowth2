using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Servico.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace Cod3rsGrowth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PocoesController : ControllerBase
    {
        private ServicoPocao _servicoPocao;
        public PocoesController() 
        {
            CarregarServico();
        }
        private void CarregarServico()
        {
            _servicoPocao = _serviceProvider.GetService<ServicoPocao>()
                ?? throw new Exception($"Erro ao obter servico [{nameof(ServicoPocao)}]");
        }

        [HttpGet]
        public IActionResult ObterTodos([FromQuery] FiltroPocao filtroPocao)
        {
            return Ok(_servicoPocao.ObterTodos(filtroPocao));
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            return Ok(_servicoPocao.ObterPorId(id));
        }

        [HttpPost]
        public IActionResult Criar([FromBody] List<Ingrediente> ingredientes)
        {
            var id = _servicoPocao.Criar(ingredientes);

            return Ok(CreatedAtAction(nameof(ObterPorId), new { id = id }, _servicoPocao.ObterPorId(id)));
        }
        
        [HttpDelete("{id}")]
        public IActionResult Remover(int id)
        {
            _servicoPocao.Remover(id);

            return NoContent();
        }
    }
}
