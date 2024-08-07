﻿using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Dominio.Interfaces;
using Cod3rsGrowth.Infra.ConexaoBD;
using LinqToDB;

namespace Cod3rsGrowth.Infra.Repositorios
{
    public class RepositorioIngrediente : IRepositorioIngrediente
    {
        private MeuContextoDeDados _db;

        public RepositorioIngrediente(MeuContextoDeDados db)
        {
            _db = db;
        }

        public List<Ingrediente> ObterTodos(FiltroIngrediente? ingrediente)
        {
            return Filtrar(ingrediente);
        }
        public List<Ingrediente> ObterTodos()
        {
            return _db.ingrediente.ToList();
        }

        public Ingrediente ObterPorId(int idProcurado)
        {
            var query = from p in _db.ingrediente
                        where (p.Id == idProcurado)
                        select p;

            var resultado = query.FirstOrDefault()
                ?? throw new Exception($"Id: [{idProcurado}] não foi encontrado no banco de dados");

            return resultado;
        }

        public int Criar(Ingrediente ingrediente)
        {
            return _db.InsertWithInt32Identity(ingrediente);
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

        public List<Ingrediente> Filtrar(FiltroIngrediente? ingrediente)
        {
            IQueryable<Ingrediente> query = _db.ingrediente.AsQueryable();

            if (ingrediente is null) return query.ToList();
            
            if (ingrediente.Id is not null)
                query = query.Where(r => r.Id == ingrediente.Id);

            if (!string.IsNullOrWhiteSpace(ingrediente.Nome))
                query = query.Where(r => r.Nome.Contains(ingrediente.Nome) );

            if (ingrediente.Quantidade is not null)
                query = query.Where(r => r.Quantidade == ingrediente.Quantidade);

            if (ingrediente.Naturalidade is not null)
                query = query.Where(r => r.Naturalidade == ingrediente.Naturalidade);

            return query.ToList();
        }
    }
}
