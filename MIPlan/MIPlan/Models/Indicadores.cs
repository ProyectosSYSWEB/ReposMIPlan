using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Indicadores
    {
        public int Id { get; set; }
        public string Categoria{ get; set; }
        public string Descripcion { get; set; }
        public string Subtipo { get; set; }
        public string Etiqueta_1 { get; set; }
        public string Etiqueta_2 { get; set; }
        public string Evolutivo { get; set; }
    }

    public class ResultadoIndicadores
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Indicadores> Resultado { get; set; }
    }
}