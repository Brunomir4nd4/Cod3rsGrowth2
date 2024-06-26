﻿using Cod3rsGrowth.Dominio.Interfaces;
namespace Cod3rsGrowth.Dominio.Entidades
{
    public class FiltroReceita : IFiltro
    {
        public int? Id { get; set; }
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public decimal? Valor { get; set; }
        public string? Imagem { get; set; }
        public int? ValidadeEmMeses { get; set; }
    }
}
