using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class UnidadesResponsables
    {
        public int Id { get; set; }
        public string Dependecia { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Coordinador { get; set; }
    }

    public class ResultadoUnidades //Agregue 26-11-2019
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<UnidadesResponsables> Resultado { get; set; }

    }
}
