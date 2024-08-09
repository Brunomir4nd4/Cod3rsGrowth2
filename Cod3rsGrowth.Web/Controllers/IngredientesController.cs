using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Dominio.Enums;
using Cod3rsGrowth.Servico.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace Cod3rsGrowth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientesController : ControllerBase
    {
        private ServicoIngrediente _servicoIngrediente;
        public IngredientesController()
        {
            CarregarServico();
        }

        private void CarregarServico()
        {
            _servicoIngrediente = _serviceProvider.GetService<ServicoIngrediente>()
                ?? throw new Exception($"Erro ao obter servico [{nameof(ServicoIngrediente)}]");
        }

        [HttpGet]
        public IActionResult ObterTodos([FromQuery] FiltroIngrediente filtroIngrediente)
        {
            return Ok(_servicoIngrediente.ObterTodos(filtroIngrediente));
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            return Ok(_servicoIngrediente.ObterPorId(id));
        }

        [HttpGet("naturalidade")]
        public IActionResult ObterEnum()
        {
            var naturalidadeValues = Enum.GetNames(typeof(Naturalidade)).ToList();
            return Ok(naturalidadeValues);
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Ingrediente ingrediente)
        {
            int id = _servicoIngrediente.Criar(ingrediente);

            return CreatedAtAction(nameof(ObterPorId), new { id = id }, ingrediente);
        }

        [HttpPatch]
        public IActionResult Editar([FromBody] Ingrediente ingrediente)
        {
            return Ok(_servicoIngrediente.Editar(ingrediente));
        }

        [HttpDelete]
        public IActionResult Remover(int id)
        {
            _servicoIngrediente.Remover(id);

            return NoContent();
        }
    }
}
