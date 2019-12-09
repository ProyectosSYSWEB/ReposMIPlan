using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Unidades
    {
        public int Id { get; set; }
        public string Dependencia { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Coordinador { get; set; }
        public string DescripcionDependencia { get; set; }
    }

    public class ResultadoUnidad
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Unidades> Resultado { get; set; }

    }
}