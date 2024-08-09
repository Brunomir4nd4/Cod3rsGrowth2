using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Dominio.Interfaces;
using Cod3rsGrowth.Servico.Validadores;
using FluentValidation;
using System.ComponentModel;

namespace Cod3rsGrowth.Servico.Servicos
{
    public class ServicoIngrediente
    {
        private IRepositorioIngrediente _repositorioIngrediente;
        private IngredienteValidator _validator;

        public ServicoIngrediente(IRepositorioIngrediente repositorioIngrediente, IngredienteValidator validator)
        {
            _repositorioIngrediente = repositorioIngrediente;
            _validator = validator;
        }

        public List<Ingrediente> ObterTodos(FiltroIngrediente? ingrediente)
        {
            return _repositorioIngrediente.ObterTodos(ingrediente);
        }
        public List<Ingrediente> ObterTodos()
        {
            return _repositorioIngrediente.ObterTodos();
        }

        public Ingrediente ObterPorId(int id)
        {
            return _repositorioIngrediente.ObterPorId(id);
        }

        public int Criar(Ingrediente ingrediente)
        {
            var validate = _validator.Validate(ingrediente, options =>
                options.IncludeRuleSets("Criar").IncludeRulesNotInRuleSet());

            if (!validate.IsValid)
            {
                var erros = string.Join(Environment.NewLine, validate.Errors.Select(e => e.ErrorMessage));
                throw new ValidationException(erros);
            }

            return _repositorioIngrediente.Criar(ingrediente);
        }

        public Ingrediente Editar(Ingrediente ingredienteEditado)
        {
            var validate = _validator.Validate(ingredienteEditado, options => 
                options.IncludeRuleSets("Editar").IncludeRulesNotInRuleSet());

            if (!validate.IsValid)
            {
                var erros = string.Join(Environment.NewLine, validate.Errors.Select(e => e.ErrorMessage));
                throw new ValidationException(erros);
            }

            return _repositorioIngrediente.Editar(ingredienteEditado);
        }

        public void Remover(int idIngredienteSelecionado)
        {
            _repositorioIngrediente.Remover(idIngredienteSelecionado);
        }
    }
}
