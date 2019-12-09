using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Periodos
    {
        public int Id { get; set; }
        public string Dependencia { get; set; }
        public string Periodo { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Ejercicio { get; set; }
        public string Inicio { get; set; }
        public string Fin { get; set; }
        public string DescripcionDependencia { get; set; }

    }

    public class ResultadoPeriodos
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Periodos> Resultado { get; set; }

    }
}