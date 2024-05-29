﻿using Cod3rsGrowth.Dominio.Entidades;
using Cod3rsGrowth.Infra.Interfaces;
using Cod3rsGrowth.Servico.Validadores;
using FluentValidation;

namespace Cod3rsGrowth.Servico.Servicos
{
    public class ServicoReceita
    {
        private readonly IRepositorioReceita _repositorioReceita;
        private ReceitaValidator _validator;
        public ServicoReceita(IRepositorioReceita repositorioReceita, ReceitaValidator validator)
        {
            _repositorioReceita = repositorioReceita;
            _validator = validator;
        }
        public List<Receita> ObterTodos()
        {
            return _repositorioReceita.ObterTodos();
        }
        public Receita ObterPorId(int id)
        {
            return _repositorioReceita.ObterPorId(id);
        }
        public void CriarReceita(Receita receita)
        {
            string erros = "";
            var validate = _validator.Validate(receita);
            if (!validate.IsValid)
            {
                foreach (var erro in validate.Errors)
                {
                    erros += erro.ErrorMessage;
                }
                throw new ValidationException(erros);
            }
            _repositorioReceita.Criar(receita);
        }
        public void EditarReceita()
        {
        }
        public void RemoverReceita()
        {
        }
    }
}