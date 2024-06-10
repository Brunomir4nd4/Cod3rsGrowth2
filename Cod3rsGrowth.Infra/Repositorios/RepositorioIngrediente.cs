﻿using Cod3rsGrowth.Dominio.Interface;
using Cod3rsGrowth.Dominio.Entidades;
using LinqToDB;

namespace Cod3rsGrowth.Infra.Repositorios
{
    public class RepositorioIngrediente : IRepositorio<Ingrediente>
    {
        private MeuContextoDeDados _db;

        public RepositorioIngrediente(MeuContextoDeDados db)
        {
            _db = db;
        }

        public List<Ingrediente> ObterTodos(Ingrediente ingrediente)
        {
            var query = Filtrar(ingrediente);
            return query;
        }

        public Ingrediente ObterPorId(int idProcurado)
        {
            return ObterPorId(idProcurado);
        }

        public void Criar(Ingrediente ingrediente)
        {
            _db.Insert(ingrediente);
        }

        public Ingrediente Editar(Ingrediente ingredienteEditado)
        {
            var ingredienteAtualizado = ObterPorId(ingredienteEditado.Id);

            ingredienteAtualizado.Nome = ingredienteEditado.Nome;
            ingredienteAtualizado.Quantidade = ingredienteEditado.Quantidade;
            ingredienteAtualizado.Naturalidade = ingredienteEditado.Naturalidade;

            _db.Update(ingredienteAtualizado);
            return ingredienteAtualizado;
        }
        public void Remover(int idIngrediente)
        {
            _db.ingrediente
                .Where(p => p.Id == idIngrediente)
                .Delete();
        }

        public List<Ingrediente> Filtrar(Ingrediente ingrediente)
        {
            IQueryable<Ingrediente> query = _db.ingrediente.AsQueryable();

            if (ingrediente.Id != 0)
                query = query.Where(r => r.Id == ingrediente.Id);

            if (!string.IsNullOrWhiteSpace(ingrediente.Nome))
                query = query.Where(r => r.Nome == ingrediente.Nome);

            if (ingrediente.Quantidade != 0)
                query = query.Where(r => r.Quantidade == ingrediente.Quantidade);

            if (ingrediente.Naturalidade != null)
                query = query.Where(r => r.Naturalidade == ingrediente.Naturalidade);

            return query.ToList();
        }
    }
}
